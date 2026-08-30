import { beforeEach, expect, test, vi } from "vitest";

const { calls, channel, supabase } = vi.hoisted(() => {
	const calls = {};
	const channel = {
		on(event, filter, callback) {
			calls.listener = { event, filter, callback };
			return channel;
		},
		subscribe(callback) {
			calls.subscribe = callback;
			return channel;
		},
	};
	const supabase = {
		channel(name, options) {
			calls.channel = { name, options };
			return channel;
		},
		removeChannel(removedChannel) {
			calls.removedChannel = removedChannel;
			return Promise.resolve();
		},
	};
	return { calls, channel, supabase };
});

vi.mock("@supabase/supabase-js", () => ({
	createClient: () => supabase,
	REALTIME_SUBSCRIBE_STATES: {
		CHANNEL_ERROR: "CHANNEL_ERROR",
		TIMED_OUT: "TIMED_OUT",
	},
}));

const { onSectionUpdate } = await import("./on-section-update");

beforeEach(() => {
	for (const key of Object.keys(calls)) delete calls[key];
});

test("listens for Postgres changes on the configured table", () => {
	let updates = 0;
	const remove = onSectionUpdate(
		{
			supabaseURL: "https://example.supabase.co",
			supabaseAnonKey: "anon-key",
			supabaseTableName: "portfolio_v2",
		},
		() => updates++,
	);

	expect(calls.channel).toEqual({
		name: "table:portfolio_v2",
		options: undefined,
	});
	expect(calls.listener.event).toBe("postgres_changes");
	expect(calls.listener.filter).toEqual({
		event: "*",
		schema: "public",
		table: "portfolio_v2",
	});

	calls.listener.callback();
	expect(updates).toBe(1);

	remove();
	expect(calls.removedChannel).toBe(channel);
});

test("logs failed subscription states", () => {
	onSectionUpdate(
		{
			supabaseURL: "https://example.supabase.co",
			supabaseAnonKey: "anon-key",
			supabaseTableName: "portfolio_v2",
		},
		() => {},
	);

	expect(calls.subscribe).toBeTypeOf("function");

	const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
	try {
		calls.subscribe("SUBSCRIBED");
		calls.subscribe("CLOSED");
		expect(errorLog).not.toHaveBeenCalled();

		const error = new Error("channel failed");
		calls.subscribe("CHANNEL_ERROR", error);
		calls.subscribe("TIMED_OUT");
		expect(errorLog).toHaveBeenCalledTimes(2);
		expect(errorLog.mock.calls[0].at(-1)).toBe(error);
	} finally {
		errorLog.mockRestore();
	}
});

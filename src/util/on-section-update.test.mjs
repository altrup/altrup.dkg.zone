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
	const log = vi.spyOn(console, "log").mockImplementation(() => {});
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

	try {
		calls.listener.callback({
			schema: "public",
			table: "portfolio_v2",
			commit_timestamp: "2026-08-30T20:00:00Z",
			errors: [],
			eventType: "UPDATE",
			new: { id: 1 },
			old: { id: 1 },
		});
		expect(updates).toBe(1);
		expect(log).toHaveBeenCalledWith(
			expect.stringContaining("Realtime update"),
			"UPDATE",
			"public",
			"portfolio_v2",
		);
	} finally {
		log.mockRestore();
	}

	remove();
	expect(calls.removedChannel).toBe(channel);
});

test("logs subscription states", () => {
	onSectionUpdate(
		{
			supabaseURL: "https://example.supabase.co",
			supabaseAnonKey: "anon-key",
			supabaseTableName: "portfolio_v2",
		},
		() => {},
	);

	expect(calls.subscribe).toBeTypeOf("function");

	const log = vi.spyOn(console, "log").mockImplementation(() => {});
	try {
		calls.subscribe("SUBSCRIBED");
		calls.subscribe("CLOSED");
		const error = new Error("channel failed");
		calls.subscribe("CHANNEL_ERROR", error);
		calls.subscribe("TIMED_OUT");

		expect(log).toHaveBeenCalledTimes(4);
		expect(log).toHaveBeenCalledWith(
			expect.stringContaining("Supabase Realtime"),
			"CHANNEL_ERROR",
			error,
		);
	} finally {
		log.mockRestore();
	}
});

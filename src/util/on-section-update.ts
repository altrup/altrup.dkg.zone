import { createClient, REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";

export const onSectionUpdate = (
	{
		supabaseURL,
		supabaseAnonKey,
		supabaseTableName,
	}: {
		supabaseURL: string;
		supabaseAnonKey: string;
		supabaseTableName: string;
	},
	callback: () => unknown,
) => {
	const supabase = createClient(supabaseURL, supabaseAnonKey);
	const channel = supabase
		.channel(`table:${supabaseTableName}`)
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: supabaseTableName },
			() => callback(),
		)
		.subscribe((status, error) => {
			if (
				status === REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR ||
				status === REALTIME_SUBSCRIBE_STATES.TIMED_OUT
			) {
				console.error(`Supabase Realtime subscription ${status}`, error);
			}
		});

	return () => {
		supabase.removeChannel(channel).catch(console.error);
	};
};

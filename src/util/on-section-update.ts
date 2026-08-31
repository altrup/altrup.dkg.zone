import { createClient } from "@supabase/supabase-js";

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
			(payload) => {
				console.log(
					"Supabase Realtime update:",
					payload.eventType,
					payload.schema,
					payload.table,
				);
				callback();
			},
		)
		.subscribe((status, error) => {
			console.log("Supabase Realtime:", status, error);
		});

	return () => {
		supabase.removeChannel(channel).catch(console.error);
	};
};

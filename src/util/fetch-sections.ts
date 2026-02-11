import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import { Section } from "../types";

export const fetchSections = async ({
	supabaseURL,
	supabaseAnonKey,
	supabaseTableName,
}: {
	supabaseURL?: string;
	supabaseAnonKey?: string;
	supabaseTableName?: string;
}) => {
	if (!supabaseURL || !supabaseAnonKey || !supabaseTableName) {
		throw new Error("Missing required Supabase environment variables");
	}

	const supabase = createClient(supabaseURL, supabaseAnonKey);

	const { data, error } = (await supabase
		.from(supabaseTableName)
		.select("id, Sections")
		.order("id", { ascending: true })) as PostgrestSingleResponse<
		{ id: number; Sections: Section }[]
	>;

	if (error) {
		throw error;
	}

	return data.map(({ Sections }) => Sections);
};

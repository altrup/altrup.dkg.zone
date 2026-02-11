import { createClient, PostgrestError } from "@supabase/supabase-js";
import { Section } from "../types";

export const fetchSections = ({
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
	const tableName = supabaseTableName;

	return new Promise<Section[]>((resolve, reject) => {
		supabase
			.from(tableName)
			.select("id, Sections")
			.then(
				({
					data,
					error,
				}: {
					data: { id: number; Sections: Section }[] | null;
					error: PostgrestError | null;
				}) => {
					if (error) {
						reject(error);
					} else if (data) {
						const sortedData = data.sort((a, b) => a.id - b.id);
						resolve(sortedData.map(({ Sections }) => Sections));
					}
				},
			);
	});
};

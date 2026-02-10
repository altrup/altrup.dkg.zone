import { getSections } from "../src/util/get-sections";
import Root from "../src/page/root";

export const revalidate = false;

export default async function Page() {
  const supabaseURL = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const supabaseTableName = process.env.SUPABASE_TABLE_NAME;

  if (!supabaseURL || !supabaseAnonKey || !supabaseTableName) {
    throw new Error("Missing required Supabase environment variables");
  }

  const sections = await getSections({
    supabaseURL,
    supabaseAnonKey,
    supabaseTableName,
  });

  return <Root sections={sections} />;
}

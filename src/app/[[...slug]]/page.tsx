import fs from "fs/promises";
import path from "path";
import { getSections } from "../../util/get-sections";
import Root from "../../page/root";

export const revalidate = false;

export default async function Page() {
  const isProduction = process.env.NODE_ENV === "production";

  const sectionsFilePath = process.env.SECTIONS_JSON_FILE
    ? path.normalize(process.env.SECTIONS_JSON_FILE)
    : null;

  let sections = undefined;
  if (!isProduction) {
    if (sectionsFilePath) {
      console.log(`Loading sections from ${sectionsFilePath}`);
      try {
        sections = JSON.parse(
          await fs.readFile(sectionsFilePath, "utf8"),
        ) as Section[];
      } catch (e) {
        console.log(`Failed to load sections from ${sectionsFilePath}`, e);
      }
    } else {
      console.log("No SECTIONS_JSON_FILE specified");
    }
  }

  if (!sections) {
    console.log("Loading sections from supabase");

    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseTableName = process.env.SUPABASE_TABLE_NAME;

    if (!supabaseURL || !supabaseAnonKey || !supabaseTableName) {
      throw new Error("Missing required Supabase environment variables");
    }

    sections = await getSections({
      supabaseURL: supabaseURL,
      supabaseAnonKey: supabaseAnonKey,
      supabaseTableName: supabaseTableName,
    });
  }

  return <Root sections={sections} />;
}

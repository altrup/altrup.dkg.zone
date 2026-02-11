import fs from "fs/promises";
import path from "path";
import { Section } from "../types";
import { onSectionUpdate } from "./on-section-update";
import { fetchSections } from "./fetch-sections";
import { FSWatcher, watch } from "fs";

let cachedSections: Section[] | null = null;
let removeSupabaseListener: (() => unknown) | null = null;
let fileWatcher: FSWatcher | null = null;

const updateSections = async () => {
  const isProduction = process.env.NODE_ENV === "production";

  const sectionsFilePath = process.env.SECTIONS_JSON_FILE
    ? path.normalize(process.env.SECTIONS_JSON_FILE)
    : null;

  if (!isProduction) {
    if (sectionsFilePath) {
      console.log(`Loading sections from ${sectionsFilePath}`);
      try {
        cachedSections = JSON.parse(
          await fs.readFile(sectionsFilePath, "utf8"),
        ) as Section[];

        // Update listeners
        removeSupabaseListener?.();
        removeSupabaseListener = null;
        if (!fileWatcher) {
          fileWatcher = watch(
            sectionsFilePath,
            undefined,
            (eventType: string) => {
              if (eventType === "change") {
                updateSections().catch(console.error);
              }
            },
          );
        }
      } catch (e) {
        console.log(`Failed to load sections from ${sectionsFilePath}`, e);
      }
    } else {
      console.log("No SECTIONS_JSON_FILE specified");
    }
  }

  if (!cachedSections) {
    console.log("Loading sections from supabase");

    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseTableName = process.env.SUPABASE_TABLE_NAME;

    if (!supabaseURL || !supabaseAnonKey || !supabaseTableName) {
      throw new Error("Missing required Supabase environment variables");
    }

    cachedSections = await fetchSections({
      supabaseURL: supabaseURL,
      supabaseAnonKey: supabaseAnonKey,
      supabaseTableName: supabaseTableName,
    });

    // also update listeners
    fileWatcher?.close();
    fileWatcher = null;
    if (!removeSupabaseListener) {
      removeSupabaseListener = onSectionUpdate(
        {
          supabaseURL: supabaseURL,
          supabaseAnonKey: supabaseAnonKey,
          supabaseTableName: supabaseTableName,
        },
        async () => {
          cachedSections = await updateSections();
        },
      );
    }
  }

  return cachedSections;
};

export const getSections = async () => {
  return cachedSections ?? (await updateSections());
};

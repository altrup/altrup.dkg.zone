import fs from "fs/promises";
import path from "path";
import { Section } from "../types";
import { onSectionUpdate } from "./on-section-update";
import { fetchSections } from "./fetch-sections";
import { FSWatcher, watch } from "fs";

declare global {
  var __sectionsCache:
    | {
        sections: Section[] | null;
        removeSupabaseListener: (() => unknown) | null;
        fileWatcher: FSWatcher | null;
      }
    | undefined;
}

globalThis.__sectionsCache?.removeSupabaseListener?.();
globalThis.__sectionsCache?.fileWatcher?.close();
globalThis.__sectionsCache = {
  sections: null,
  removeSupabaseListener: null,
  fileWatcher: null,
};

const getState = () => {
  if (!globalThis.__sectionsCache) {
    globalThis.__sectionsCache = {
      sections: null,
      removeSupabaseListener: null,
      fileWatcher: null,
    };
  }
  return globalThis.__sectionsCache;
};

const updateSections = async () => {
  const state = getState();

  const isProduction = process.env.NODE_ENV === "production";

  const sectionsFilePath = process.env.SECTIONS_JSON_FILE
    ? path.normalize(process.env.SECTIONS_JSON_FILE)
    : null;

  if (!isProduction) {
    if (sectionsFilePath) {
      console.log(`Loading sections from ${sectionsFilePath}`);
      try {
        state.sections = JSON.parse(
          await fs.readFile(sectionsFilePath, "utf8"),
        ) as Section[];

        // Update listeners
        state.removeSupabaseListener?.();
        state.removeSupabaseListener = null;
        if (!state.fileWatcher) {
          state.fileWatcher = watch(
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

  if (!state.sections) {
    console.log("Loading sections from supabase");

    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseTableName = process.env.SUPABASE_TABLE_NAME;

    if (!supabaseURL || !supabaseAnonKey || !supabaseTableName) {
      throw new Error("Missing required Supabase environment variables");
    }

    state.sections = await fetchSections({
      supabaseURL: supabaseURL,
      supabaseAnonKey: supabaseAnonKey,
      supabaseTableName: supabaseTableName,
    });

    // also update listeners
    state.fileWatcher?.close();
    state.fileWatcher = null;
    if (!state.removeSupabaseListener) {
      state.removeSupabaseListener = onSectionUpdate(
        {
          supabaseURL: supabaseURL,
          supabaseAnonKey: supabaseAnonKey,
          supabaseTableName: supabaseTableName,
        },
        async () => {
          state.sections = await updateSections();
        },
      );
    }
  }

  globalThis.__sectionsCache = state;
  return state.sections;
};

export const getSections = async () => {
  const state = getState();
  return state.sections ?? (await updateSections());
};

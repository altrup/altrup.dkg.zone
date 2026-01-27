import fs from "fs/promises";
import path from "path";
import { defineConfig, loadEnv, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";

import { getSections } from "./src/helper-functions/getSections";

const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  let sections;

  const sectionsFilePath = env.SECTIONS_JSON_FILE ? path.normalize(
    path.join(__dirname, env.SECTIONS_JSON_FILE),
  ) : null;
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

    sections = await getSections({
      supabaseAnonKey: env.SUPABASE_ANON_KEY,
      supabaseURL: env.SUPABASE_URL,
      supabaseTableName: env.SUPABASE_TABLE_NAME,
    });
  }

  return {
    plugins: [
      react(),
      !isProduction && sectionsFilePath
        ? {
          name: "restart-on-json-change",
          configureServer(server: ViteDevServer) {
            // Manually add the file to the watcher
            server.watcher.add(sectionsFilePath);

            server.watcher.on("change", (file: string) => {
              if (path.normalize(file) === sectionsFilePath) {
                console.log(
                  "🔄 Sections JSON changed. Restarting Vite server...",
                );
                server.restart().catch((e: unknown) => {
                  console.error(e);
                });
              }
            });
          },
        }
        : undefined,
    ],
    define: {
      __SECTIONS__: sections,
    },
  };
});

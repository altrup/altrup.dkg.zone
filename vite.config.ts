import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { getProjects } from './src/helper-functions/getProjects';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      __PROJECTS__: await getProjects({
        supabaseAnonKey: env.SUPABASE_ANON_KEY,
        supabaseURL: env.SUPABASE_URL,
        supabaseTableName: env.SUPABASE_TABLE_NAME
      }),
    }
  }
});

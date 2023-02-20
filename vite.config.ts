import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), tsconfigPaths()],
  base: '/fe-test/',
});

import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Weather-patterns/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

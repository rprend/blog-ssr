import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'src/worker.ts'),
      output: {
        entryFileNames: 'worker.js',
        format: 'es',
      },
      external: ['hono', 'gray-matter', 'marked'],
    },
    target: 'esnext',
    minify: false,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index-cubes.html',
      output: {
        entryFileNames: 'cubes-bundle.js',
        chunkFileNames: 'cubes-bundle.js',
        assetFileNames: 'cubes-bundle.[ext]'
      }
    },
    outDir: 'dist'
  }
});

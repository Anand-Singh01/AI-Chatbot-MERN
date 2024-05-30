import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    sourcemap: false,  // Enable source maps for easier debugging
    minify: 'terser',  // Use terser for minification
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,  // Adjust this if you have custom chunking logic
      },
    },
  },
});

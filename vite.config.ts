import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'ignore-md-files',
          resolveId(source) {
            if (source.endsWith('.md')) {
              return false;
            }
          },
        },
      ],
    },
  },
});

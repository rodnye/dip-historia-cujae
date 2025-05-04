import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import pluginArticle from './plugins/articles';
import pluginCleanArticleMarkdown from './plugins/clean-article-md';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react(), pluginArticle(), pluginCleanArticleMarkdown()],
});

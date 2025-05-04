import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import type { Plugin } from 'vite';

/**
 * Vite plugin that removes index.md files from the production build
 * in /dist/articles/[id]/index.md after the build is complete
 */
export default function pluginCleanArticleMarkdown(): Plugin {
  return {
    name: 'custom-plugin-clean-article-markdown',

    // when build is complete
    closeBundle: {
      sequential: true,
      order: 'post',
      async handler() {
        if (process.env.NODE_ENV === 'production') {
          try {
            // find all index.md files
            const files = await glob('dist/articles/**/index.md');

            // delete
            for (const file of files) {
              fs.unlinkSync(path.resolve(process.cwd(), file));
            }

            if (files.length > 0) {
              console.log(
                `✅ Removed ${files.length} markdown files from production build`,
              );
            }
          } catch (error) {
            console.error('❌ Error cleaning up markdown files:', error);
          }
        }
      },
    },
  };
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { z } from 'zod';

import type { Plugin } from 'vite';
import type { Node } from 'unist';
import type { Paragraph, Image } from 'mdast';
import type { ViteDevServer } from 'vite';
import type { ArticleData, ArticleMap } from '../src/@types/articles';

type ArticleFrontmatter = Partial<ArticleData>;

// schema for validating article frontmatter
const frontmatterSchema = z.object({
  title: z.string(),
  author: z.string(),
  date: z.coerce.string(),
  desc: z.string(),
  tags: z.array(z.string()),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
});

interface PluginOptions {
  articlesDir?: string;
  outputFile?: string;
  watch?: boolean;
}

/**
 * Vite plugin that:
 * 1. Processes markdown articles with frontmatter (/public/articles/[id]/index.md)
 * 2. Generates HTML content files (/public/articles/[id]/content.html)
 * 3. Creates a manifest JSON with all articles metadata (/src/articles.json)
 */
export default function pluginArticles(options: PluginOptions = {}): Plugin {
  const {
    articlesDir = path.join(process.cwd(), 'public', 'articles'),
    outputFile = path.join(process.cwd(), 'src', 'articles.json'),
    watch = true,
  } = options;

  // main function that processes all articles
  const generateArticles = async (): Promise<void> => {
    const articles: ArticleMap = {};

    for (const id of fs.readdirSync(articlesDir)) {
      const raw = fs
        .readFileSync(path.join(articlesDir, id, 'index.md'))
        .toString();

      // parse frontmatter and markdown content
      const matterResult = matter(raw) as {
        data: ArticleFrontmatter;
        content: string;
      };

      let frontmatter: z.infer<typeof frontmatterSchema>;

      // validate frontmatter structure
      try {
        frontmatter = frontmatterSchema.parse(matterResult.data);
      } catch (error) {
        if (!(error instanceof Error)) throw error;
        throw new Error(
          `Invalid frontmatter in article ${id}: ${error.message}`,
        );
      }

      const images: { url: string; alt: string }[] = [];

      // now process markdown to HTML with custom image handling
      const html = await remark()
        .use(() => {
          return (tree: Node) => {
            visit(tree, 'paragraph', (node: Paragraph) => {
              const firstChild = node.children?.[0];
              if (!firstChild || firstChild.type !== 'image') return;

              // enhance image nodes with additional properties
              if (!node.data) node.data = {};
              node.data.hProperties = {
                className: 'image-container',
              };

              const imageNode = firstChild as Image;
              imageNode.url = path.join('/articles', id, imageNode.url);

              // add image caption
              node.children.push({
                type: 'strong',
                children: [
                  {
                    type: 'text',
                    value: imageNode.alt || '',
                  },
                ],
              });

              images.push({
                url: imageNode.url,
                alt: imageNode.alt || '',
              });
            });
          };
        })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .process(matterResult.content);

      // write processed HTML to file
      fs.writeFileSync(
        path.join(articlesDir, id, 'content.html'),
        String(html),
      );

      // store article metadata in src/articles.json
      articles[id] = {
        id,
        path: `/articles/${id}`,
        images,
        title: frontmatter.title || '',
        date: frontmatter.date,
        author: frontmatter.author || '',
        desc: frontmatter.desc || '',
        tags: frontmatter.tags || [],
        image: {
          src: frontmatter.image?.src
            ? path.join('/articles', id, frontmatter.image.src)
            : '',
          alt: frontmatter.image?.alt || '',
        },
      };
    }

    // Generate articles manifest
    fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
    console.log('Content src/articles.json generated!');
  };

  return {
    name: 'custom-plugin-articles',

    // Plugin hooks
    buildStart() {
      generateArticles().catch(console.error);
    },

    configureServer(server: ViteDevServer) {
      if (watch) {
        // Watch for markdown changes in dev mode
        server.watcher.add(articlesDir + '/**/index.md');
        server.watcher.on('change', (changedPath: string) => {
          if (changedPath.endsWith('index.md')) {
            generateArticles().catch(console.error);
          }
        });
      }
    },
  };
}

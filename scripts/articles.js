import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { visit as visitNode } from 'unist-util-visit';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'public', 'articles');
const outputFile = path.join(process.cwd(), 'src', 'articles.json');

export const generateArticlesRouter = async () => {
  const articles = {};

  for (const id of fs.readdirSync(articlesDir)) {
    const raw = fs
      .readFileSync(path.join(articlesDir, id, 'index.md'))
      .toString();
    const { data: frontmatter, content } = matter(raw);
    const images = [];

    const html = await remark()
      .use(() => {
        return (tree) => {
          // process parafraph then contains images
          visitNode(tree, 'paragraph', (node) => {
            if (!node.children || node.children[0].type !== 'image') return;

            // add classname
            if (!node.data) node.data = {};
            node.data.hProperties = {
              className: 'image-container',
            };

            const imageNode = node.children[0];

            // change to absolute url
            imageNode.url = path.join('/articles', id, imageNode.url);

            // add label text
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
              alt: imageNode.alt,
            });
          });
        };
      })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(content);

    fs.writeFileSync(path.join(articlesDir, id, 'content.html'), String(html));

    frontmatter.image.src = path.join('/articles', id, frontmatter.image.src);
    articles[id] = {
      id,
      path: `/articles/${id}`,
      images,
      ...frontmatter,
    };
  }

  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
  console.log('Content manifest generated!');
};

generateArticlesRouter();

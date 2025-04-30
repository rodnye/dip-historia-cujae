import { Link } from 'wouter';
import { ImageLoader } from './ImageLoader';
import { TagsList } from './TagsList';

interface Props {
  articleData: ArticleData;
}

export function ArticleCard({ articleData }: Props) {
  return (
    <Link to={articleData.path}>
      <div className="my-6 flex flex-col p-3">
        <h2 className="my-3 text-xl font-bold text-primary underline">
          {articleData.title}
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[200px] flex-1">
            <ImageLoader
              className="h-auto w-full rounded-lg"
              loaderClassName="h-full"
              src={articleData.image.src}
              alt={articleData.image.alt}
            />
          </div>
          <div className="min-w-[50%] flex-1">
            <p>
              <strong className="font-bold">Autor:</strong> {articleData.author}
            </p>
            <TagsList tags={articleData.tags} />
            <p>
              {articleData.desc + ' '}
              <span className="font-bold text-blue-700 underline">
                Ver artículo...
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

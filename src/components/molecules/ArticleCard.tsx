import { Link } from 'wouter';
import { ImageLoader } from './ImageLoader';
import { TagsList } from './TagsList';
import { ArticleData } from '../../@types/articles';

interface Props {
  articleData: ArticleData;
}

export function ArticleCard({ articleData }: Props) {
  return (
    <Link to={articleData.path}>
      <div className="group my-4 overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:my-6 sm:rounded-xl sm:hover:-translate-y-1 sm:hover:shadow-lg dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row">
          {/* Imagen - Responsive con relación de aspecto */}
          <div className="relative h-48 w-full overflow-hidden sm:h-auto sm:w-1/3 lg:w-2/5">
            <ImageLoader
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loaderClassName="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
              src={articleData.image.src}
              alt={articleData.image.alt}
            />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>

          {/* Contenido */}
          <div className="flex-1 p-4 sm:p-6">
            <h2 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600 sm:text-2xl dark:text-white dark:group-hover:text-blue-400">
              {articleData.title}
            </h2>

            <div className="mb-3 flex flex-wrap items-center text-xs text-gray-600 sm:mb-4 sm:text-sm dark:text-gray-300">
              <span className="mr-1 font-medium sm:mr-2">
                Por {articleData.author}
              </span>
              <span className="mx-1 sm:mx-2">•</span>
              <span>{new Date(articleData.date).toLocaleDateString()}</span>
            </div>

            <TagsList tags={articleData.tags} />

            <p className="mb-3 line-clamp-2 text-sm text-gray-600 sm:mb-4 sm:line-clamp-3 dark:text-gray-300">
              {articleData.desc}
            </p>

            <div className="flex items-center text-sm font-medium text-blue-600 transition-colors duration-300 group-hover:text-blue-800 sm:text-base dark:text-blue-400 dark:group-hover:text-blue-300">
              <span>Leer artículo</span>
              <svg
                className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

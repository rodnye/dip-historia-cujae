import { Link, Redirect, useParams } from 'wouter';
import { useArticle } from '../../utils/load-articles';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';
import { getReadingTime } from '../../utils/reading-time';
import { Loader } from '../atom/Loader';
import { TagsList } from '../molecules/TagsList';
import { Button } from '../atom/Button';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';

export function ArticlePage() {
  const { articleId } = useParams();
  const { article, loading, error } = useArticle(articleId || '');

  if (error) {
    return <Redirect to="/not-found" />;
  }

  // Función para formatear la fecha sin date-fns
  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Si la fecha no es válida

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {loading || !article ? (
          <section className="flex h-[calc(100vh-160px)] flex-col items-center justify-center">
            <Loader />
            <h1 className="mt-4 text-xl font-medium text-gray-600">
              Cargando artículo...
            </h1>
          </section>
        ) : (
          <article className="article mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Botón de regreso */}
            <div className="mb-6">
              <Link href="/">
                <Button className="group flex items-center gap-2">
                  <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
                  Volver a la página principal
                </Button>
              </Link>
            </div>

            {/* Encabezado del artículo */}
            <header className="mb-8">
              <TagsList tags={article.tags} />
              <h1 className="mb-4 mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  <span>{article.author}</span>
                </div>

                {article.date && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span>{getReadingTime(article.html)} de lectura</span>
                </div>
              </div>
            </header>

            {/* Imagen destacada */}
            {article.image && (
              <figure className="mb-8 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={article.image.src}
                  alt={article.image.alt}
                  className="h-auto w-full object-cover"
                />
                {article.image.alt && (
                  <figcaption className="bg-gray-100 px-4 py-2 text-sm italic text-gray-600">
                    {article.image.alt}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Contenido del artículo */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}

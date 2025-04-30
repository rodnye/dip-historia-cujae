import { Redirect, useParams } from 'wouter';
import { useArticle } from '../../utils/load-articles';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';
import { getReadingTime } from '../../utils/reading-time';
import { Loader } from '../atom/Loader';
import { TagsList } from '../molecules/TagsList';
import { Button } from '../atom/Button';

export function ArticlePage() {
  const { articleId } = useParams();
  const { article, loading, error } = useArticle(articleId || '');

  if (error) {
    return <Redirect to="/not-found" />;
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="mx-6 my-1">
          <Button>Página Principal</Button>
        </div>
      </div>

      <div className="flex flex-grow flex-col overflow-y-auto">
        {loading || !article ? (
          <section className="flex flex-col items-center justify-center self-center">
            <Loader />
            <h1 className="text-xl">Cargando artículo...</h1>
          </section>
        ) : (
          <section className="article flex flex-col p-6">
            <h1 className="py-3 text-3xl font-bold">{article.title}</h1>
            <p className="font-bold">Autor: {article.author}</p>
            <p className="font-bold">
              Tiempo de lectura: {getReadingTime(article!.html)}
            </p>
            <div className="image-container">
              <img src={article.image.src} alt={article.image.alt} />
              <strong>{article.image.alt}</strong>
            </div>
            <TagsList tags={article.tags} />
            <div
              className="article-body my-3 flex flex-col"
              dangerouslySetInnerHTML={{ __html: article!.html }}
            />
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}

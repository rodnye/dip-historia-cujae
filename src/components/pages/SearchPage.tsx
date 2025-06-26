import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'wouter';
import autoAnimate from '@formkit/auto-animate';

import { SearchField } from '../atom/SearchField';
import { Footer } from '../molecules/Footer';
import { Navbar } from '../molecules/Navbar';
import { ArticleCard } from '../molecules/ArticleCard';
import { articles } from '../../utils/load-articles';

import notFoundImg from '../../assets/search-not-found.png';
import { ArticleData } from '../../@types/articles';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filtered, setFiltered] = useState<ArticleData[]>([]);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (resultsRef.current) {
      autoAnimate(resultsRef.current);
    }
  }, [resultsRef]);

  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    setError(null);
    const input = searchValue.trim();

    if (input.length === 0) {
      setFiltered(articles);
    } else if (input.length < 3) {
      setError('Escribe 3 o más caracteres para una búsqueda precisa');
    } else {
      const filtered = articles.filter((article) => {
        const text = [
          article.author,
          article.desc,
          article.title,
          article.tags.join(' '),
        ]
          .join(' ')
          .toLowerCase();
        return text.indexOf(input.toLowerCase()) > -1;
      });

      if (!filtered.length) {
        setError('No se encontraron coincidencias');
      } else {
        setFiltered(filtered);
      }
    }
  }, [searchValue]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar>
        <section className="flex w-full flex-col items-center px-4 sm:px-6">
          <div className="w-full max-w-2xl">
            <SearchField
              value={searchValue}
              placeholder="Buscar artículos, autores o temas..."
              onInput={(value) => setSearchValue(value)}
              className="w-full"
            />
          </div>
        </section>
      </Navbar>

      <main className="flex flex-1 flex-col bg-gray-50 dark:bg-primary">
        <div className="container mx-auto flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div ref={resultsRef} className="space-y-4 sm:space-y-6">
            {!error ? (
              filtered.length > 0 ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-700 sm:text-xl dark:text-gray-300">
                    {filtered.length} resultado
                    {filtered.length !== 1 ? 's' : ''} encontrado
                    {filtered.length !== 1 ? 's' : ''}
                  </h2>
                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                    {filtered.map((article) => (
                      <ArticleCard key={article.id} articleData={article} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center py-12">
                  <img
                    src={notFoundImg}
                    className="w-40 sm:w-52"
                    alt="No se encontraron resultados"
                  />
                  <h1 className="mt-4 text-center text-lg text-gray-600 sm:text-xl dark:text-gray-400">
                    Comienza a buscar artículos en nuestra biblioteca
                  </h1>
                </div>
              )
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-12">
                <img src={notFoundImg} className="w-40 sm:w-52" alt={error} />
                <h1 className="mt-4 text-center text-lg text-gray-600 sm:text-xl dark:text-gray-400">
                  {error}
                </h1>
                {searchValue.length < 3 && (
                  <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-500">
                    Intenta con términos más específicos
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

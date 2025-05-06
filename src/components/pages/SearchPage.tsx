import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'wouter';
import autoAnimate from '@formkit/auto-animate';

import { SearchField } from '../atom/SearchField';
import { Footer } from '../molecules/Footer';
import { Navbar } from '../molecules/Navbar';
import { ArticleCard } from '../molecules/ArticleCard';
import { articles } from '../../utils/load-articles';

import notFoundImg from '../../assets/search-not-found.png';

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
    <>
      <Navbar>
        <section className="flex flex-col items-center">
          <SearchField
            value={searchValue}
            placeholder="Escribe aquí..."
            onInput={(value) => setSearchValue(value)}
          />
        </section>
      </Navbar>

      <section className="flex flex-grow flex-col overflow-y-auto">
        <div ref={resultsRef} className="flex flex-grow flex-col">
          {!error ? (
            filtered.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <img src={notFoundImg} className="w-52" />
              <h1>{error}</h1>
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
}

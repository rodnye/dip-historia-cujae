import { useEffect, useState } from 'react';
import { useSearchParams } from 'wouter';

import { SearchField } from '../atom/SearchField';
import { Footer } from '../molecules/Footer';
import { Navbar } from '../molecules/Navbar';
import { ArticleCard } from '../molecules/ArticleCard';
import { articles } from '../../utils/load-articles';
import { Button } from '../atom/Button';

import notFoundImg from '../../assets/search-not-found.png';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [filtered, setFiltered] = useState<ArticleData[]>([]);

  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    if (searchValue.length >= 3) {
      if (searchValue != '@todo') {
        setFiltered(
          articles.filter((article) => {
            const text = [
              article.author,
              article.desc,
              article.title,
              article.tags.join(' '),
            ]
              .join(' ')
              .toLowerCase();
            return text.indexOf(searchValue.toLowerCase()) > -1;
          }),
        );
      } else {
        setFiltered(articles);
      }
    } else {
      setFiltered([]);
    }
  }, [searchValue]);

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center">
        <SearchField
          value={searchValue}
          onInput={(value) => setSearchValue(value)}
        />
        <Button onClick={() => setSearchValue('@todo')}>Ver todos</Button>
      </section>

      <section className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex flex-grow flex-col">
          {filtered.length > 0 ? (
            filtered.map((article) => <ArticleCard articleData={article} />)
          ) : (
            <div className="flex flex-col items-center">
              <img src={notFoundImg} className="w-52" />
              <h1>No se encontraron coincidencias</h1>
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
}

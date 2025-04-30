import { Link, useLocation } from 'wouter';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';
import { Button } from '../atom/Button';
import { articles } from '../../utils/load-articles';
import { useRef } from 'react';

export function AuthorsPage() {
  const [, setLocation] = useLocation();
  const authorsRef = useRef(
    Array.from(new Set(articles.map((article) => article.author))),
  );

  return (
    <>
      <Navbar />
      <div className="mx-6 my-1">
        <Button onClick={() => setLocation('/')}>Página Principal</Button>
      </div>

      <section className="flex flex-grow flex-col p-6">
        <h1 className="py-3 text-3xl font-bold">Autores</h1>
        <ul className="list-inside list-disc underline">
          {authorsRef.current.map((author) => (
            <Link to={'/search?q=' + author}>
              <li key={author} className="py-1 text-lg">
                {author}
              </li>
            </Link>
          ))}
        </ul>
      </section>

      <Footer />
    </>
  );
}

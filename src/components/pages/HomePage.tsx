import { useState } from 'react';
import { Link } from 'wouter';
import { articles } from '../../utils/load-articles';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';
import { ArticleCard } from '../molecules/ArticleCard';
import { Button } from '../atom/Button';

import heroCujaeImg from '../../assets/hero-cujae.png';

export function HomePage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Navbar isMain={true} onMenu={(show) => setShowMenu(show)} />
      <header
        className="relative p-6 py-32 transition-all duration-300"
        style={{
          backgroundImage: `url(${heroCujaeImg})`,
          backgroundSize: 'auto 100%',
          backgroundPositionY: '60%',
          backgroundRepeat: 'no-repeat',
          transform: 'translateY(-10%)',
          clipPath: showMenu
            ? 'polygon(0 0, 100% 0, 100% 90%, 0 100%)'
            : 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)',
        }}
      >
        {/* black overlay */}
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-black opacity-60"></div>
        <h1 className="relative z-50 text-3xl text-primary-content">
          Tecnología con historia, ideas con futuro.
        </h1>
      </header>

      <section className="p-6 pt-0 text-body-content">
        Bienvenido al espacio donde podrás apreciar los hitos históricos y
        tecnológicos de nuestro país durante el periodo comprendido entre
        2005-2014.
        <br />
        Cortesía de nuestros autores.
      </section>

      <section className="p-6">
        <h1 className="mb-2 border-b border-b-primary py-2 text-xl">
          Artículos destacados:
        </h1>
        <div className="flex flex-col">
          {articles.slice(0, 4).map((article) => (
            <ArticleCard articleData={article} key={article.id} />
          ))}
        </div>

        <Link to="/search">
          <Button>Ver todos los artículos</Button>
        </Link>
      </section>

      <Footer />
    </>
  );
}

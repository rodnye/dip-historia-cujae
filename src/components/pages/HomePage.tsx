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
    <div className="flex min-h-screen flex-col">
      <Navbar isMain={true} onMenu={(show) => setShowMenu(show)} />

      {/* Hero Section */}
      <header
        className="relative flex h-[70vh] min-h-[500px] items-center justify-center overflow-hidden p-6 transition-all duration-300"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroCujaeImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          clipPath: showMenu
            ? 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
            : 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        }}
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in mb-6 text-4xl font-bold text-white md:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Tecnología con historia,
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
              ideas con futuro.
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Descubre los hitos históricos y tecnológicos de nuestro país
          </p>
          <Link to="/search">
            <Button>Explorar Artículos</Button>
          </Link>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Bienvenido a Historia CUJAE
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              Este es el espacio donde podrás apreciar los hitos históricos y
              tecnológicos de nuestro país durante el periodo comprendido entre
              2005-2014.
            </p>
            <p>
              Un proyecto creado con pasión por nuestra comunidad académica y
              cortesía de nuestros autores.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-900 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Explora la Línea de Tiempo
          </h2>
          <p className="mb-8 text-lg">
            Descubre los eventos históricos y tecnológicos que marcaron nuestro
            país.
          </p>
          <Link to="/timeline">
            <Button>Ir a la Línea de Tiempo</Button>
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Artículos Destacados
            </h2>
            <Link
              to="/search"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {articles.slice(0, 4).map((article) => (
              <ArticleCard articleData={article} key={article.id} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/search">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-3 hover:from-blue-600 hover:to-purple-700">
                Ver todos los artículos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

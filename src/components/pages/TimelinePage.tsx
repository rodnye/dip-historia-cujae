import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiSearch } from 'react-icons/fi';
import { Footer } from '../molecules/Footer';
import { Navbar } from '../molecules/Navbar';
import { articles } from '../../utils/load-articles';
import { ArticleData } from '../../@types/articles';
import { SearchField } from '../atom/SearchField';
import { ArticleCard } from '../molecules/ArticleCard';

export function TimelinePage() {
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    // Ordenar artículos por fecha (más recientes primero)
    const sortedArticles = [...articles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setFilteredArticles(sortedArticles);
  }, []);

  useEffect(() => {
    let results = [...articles];

    // Filtrar por búsqueda
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.desc.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Filtrar por año
    if (selectedYear) {
      results = results.filter(
        (article) => new Date(article.date).getFullYear() === selectedYear,
      );
    }

    // Ordenar resultados
    results.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setFilteredArticles(results);
  }, [searchQuery, selectedYear]);

  // Obtener años únicos para el filtro
  const uniqueYears = Array.from(
    new Set(articles.map((article) => new Date(article.date).getFullYear())),
  ).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar>
        <div className="w-full max-w-2xl px-4">
          <SearchField onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </Navbar>

      <main className="bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
        {/* Filtros */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <FiCalendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Años:
            </span>
          </div>

          <button
            onClick={() => setSelectedYear(null)}
            className={`rounded-full px-4 py-1 text-sm font-medium ${!selectedYear ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
          >
            Todos
          </button>

          {uniqueYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-full px-4 py-1 text-sm font-medium ${selectedYear === year ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Línea de tiempo */}
        {filteredArticles.length > 0 ? (
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-4 h-full w-0.5 bg-gray-200 sm:left-1/2 sm:-ml-0.5 dark:bg-gray-700" />

            {/* Elementos de la línea de tiempo */}
            <div className="space-y-8">
              {filteredArticles.map((article, index) => {
                const articleDate = new Date(article.date);
                const year = articleDate.getFullYear();
                const month = articleDate.toLocaleString('default', {
                  month: 'short',
                });
                const day = articleDate.getDate();

                return (
                  <div
                    key={article.id}
                    className={`relative flex w-full ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  >
                    {/* Punto en la línea */}
                    <div className="absolute left-4 z-10 h-3 w-3 -translate-x-1.5 rounded-full bg-blue-600 sm:left-1/2" />

                    {/* Fecha */}
                    <div
                      className={`hidden w-1/2 sm:block ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}
                    >
                      <div className="inline-flex items-center rounded-lg bg-body p-3 shadow dark:bg-gray-800">
                        <FiClock className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {day} {month} {year}
                        </span>
                      </div>
                    </div>

                    {/* Tarjeta */}
                    <div className="w-full sm:w-1/2 sm:px-4">
                      <ArticleCard articleData={article} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <FiSearch className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              No se encontraron artículos
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {searchQuery
                ? 'Intenta con otros términos de búsqueda'
                : 'No hay artículos para el año seleccionado'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

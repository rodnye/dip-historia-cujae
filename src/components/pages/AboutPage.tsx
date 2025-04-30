import { useLocation } from 'wouter';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';
import { Button } from '../atom/Button';

export function AboutPage() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Navbar />
      <div className="mx-6 my-1">
        <Button onClick={() => setLocation('/')}>Página Principal</Button>
      </div>

      <section className="flex flex-grow flex-col p-6">
        <h1 className="py-3 text-3xl font-bold">Acerca del Sitio</h1>
        <p className="text-lg">
          Este sitio web es el resultado de un trabajo integrador para la
          asignatura Diseño de Interfaces y Pruebas (DIP), en conjunto con la
          materia Historia de Cuba, correspondiente al curso 2024-2025. El
          objetivo principal es ofrecer una plataforma educativa y accesible que
          permita explorar y profundizar en diversos temas históricos de Cuba,
          combinando el rigor académico con un diseño intuitivo y amigable para
          el usuario. A través de este seminario integrador, se busca fomentar
          el aprendizaje interdisciplinario, integrando conocimientos
          tecnológicos y humanísticos para enriquecer la experiencia educativa.
        </p>
      </section>

      <Footer />
    </>
  );
}

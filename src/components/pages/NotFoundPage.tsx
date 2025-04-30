import { Link } from 'wouter';
import { Button } from '../atom/Button';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';
import error404Img from '../../assets/404.png';

export function NotFoundPage() {
  return (
    <>
      <Navbar />
      <section className="flex flex-grow flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold"> Página no encontrada </h1>
        <img src={error404Img} className="w-72" />
        <p className="m-4">
          Este enlace parece estar roto o no disponible por el momento
        </p>
        <Link to="/">
          <Button>Página Principal</Button>
        </Link>
      </section>

      <Footer />
    </>
  );
}

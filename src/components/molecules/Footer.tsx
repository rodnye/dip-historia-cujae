import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Contenido principal del footer */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo y descripción */}
        <div className="space-y-4">
          <h2 className="bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
            Historia CUJAE
          </h2>
          <p className="text-gray-400">
            Plataforma dedicada a preservar y compartir la historia de nuestra
            querida institución.
          </p>

          {/* Redes sociales */}
          <div className="flex space-x-4 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-blue-500"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-blue-400"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-pink-500"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-blue-600"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-red-500"
            >
              <FaYoutube className="text-xl" />
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="relative mb-4 from-green-400 to-teal-600 pb-2 text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:content-['']">
            Navegación
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <span className="mr-2 h-1 w-1 rounded-full bg-gray-500 transition-colors duration-300 group-hover:bg-blue-400"></span>
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <span className="mr-2 h-1 w-1 rounded-full bg-gray-500 transition-colors duration-300 group-hover:bg-blue-400"></span>
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/authors"
                className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <span className="mr-2 h-1 w-1 rounded-full bg-gray-500 transition-colors duration-300 group-hover:bg-blue-400"></span>
                Autores
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <span className="mr-2 h-1 w-1 rounded-full bg-gray-500 transition-colors duration-300 group-hover:bg-blue-400"></span>
                Buscar
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <span className="mr-2 h-1 w-1 rounded-full bg-gray-500 transition-colors duration-300 group-hover:bg-blue-400"></span>
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="relative mb-4 from-green-400 to-teal-600 pb-2 text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:content-['']">
            Contacto
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start">
              <MdEmail className="mr-2 mt-1 flex-shrink-0 text-green-400" />
              <span>rrodnyestrada1@gmail.com</span>
            </li>
            <li className="flex items-start">
              <MdPhone className="mr-2 mt-1 flex-shrink-0 text-green-400" />
              <span>+53 672 647 89</span>
            </li>
            <li className="flex items-start">
              <MdLocationOn className="mr-2 mt-1 flex-shrink-0 text-green-400" />
              <span>Calle 114, Marianao, La Habana, Cuba</span>
            </li>
          </ul>
        </div>

        {/* QR y newsletter */}
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <h3 className="relative mb-3 from-green-400 to-teal-600 pb-2 text-lg font-semibold after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-12 after:-translate-x-1/2 after:bg-gradient-to-r after:content-['']">
              Visítanos
            </h3>
            <div className="rounded-lg bg-white p-2 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <QRCode
                value="https://historia-cujae.com"
                size={120}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <p className="mt-3 text-center text-sm text-gray-400">
              Escanea el código para acceder directamente
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Historia CUJAE. Todos los derechos
            reservados.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-xs">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-green-400"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-green-400"
            >
              Términos de Servicio
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-300 hover:text-green-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

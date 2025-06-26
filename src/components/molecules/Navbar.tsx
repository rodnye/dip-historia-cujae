import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import cx from 'classix';
import { Dropdown } from '../atom/Dropdown';
import { HamburToggle } from '../atom/HamburToggle';
import { Link } from 'wouter';
import { useLocation } from 'wouter';

interface Props extends PropsWithChildren {
  onMenu?: (show: boolean) => void;
  isMain?: boolean;
  className?: string;
}

export function Navbar({ children, onMenu, isMain = false, className }: Props) {
  const navbarRef = useRef<HTMLUListElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    if (onMenu) onMenu(showMenu);
  }, [onMenu, showMenu]);

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Página Principal', show: !isMain },
    { path: '/timeline', label: 'Artículos', show: true },
    { path: '/authors', label: 'Autores', show: true },
    { path: '/about', label: 'Acerca de', show: true },
  ];

  return (
    <nav
      className={cx(
        'z-50 w-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg transition-all duration-300',
        showMenu ? 'pb-4' : 'pb-0',
        className,
      )}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo o marca */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white">
            HC
          </div>
          <span className="hidden text-xl font-bold text-white sm:block">
            Historia CUJAE
          </span>
        </Link>

        {/* Contenido adicional (children) */}
        {children && <div className="flex items-center">{children}</div>}

        {/* Menú desktop (hidden en mobile) */}
        <ul className="hidden items-center space-x-6 md:flex">
          {navItems.map(
            (item) =>
              item.show && (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cx(
                      'relative px-3 py-2 text-gray-300 transition-colors duration-200 hover:text-white',
                      location === item.path && 'font-medium text-white',
                    )}
                  >
                    {item.label}
                    {location === item.path && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></span>
                    )}
                  </Link>
                </li>
              ),
          )}
        </ul>

        {/* Botón hamburguesa (solo mobile) */}
        <div className="md:hidden">
          <HamburToggle
            className="text-white"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>

      {/* Menú móvil */}
      <Dropdown show={showMenu} nodeRef={navbarRef}>
        <ul
          className="flex flex-col items-stretch divide-y divide-gray-700 bg-gray-800"
          ref={navbarRef}
        >
          {navItems.map(
            (item) =>
              item.show && (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cx(
                      'block px-6 py-4 text-lg text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white',
                      location === item.path &&
                        'bg-gray-700 font-medium text-white',
                    )}
                    onClick={() => setShowMenu(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </Dropdown>
    </nav>
  );
}

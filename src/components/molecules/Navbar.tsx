import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import cx from 'classix';
import { Dropdown } from '../atom/Dropdown';
import { HamburToggle } from '../atom/HamburToggle';
import { Link } from 'wouter';

interface Props extends PropsWithChildren {
  onMenu?: (show: boolean) => void;
  isMain?: boolean;
}

export function Navbar({ children, onMenu, isMain = false }: Props) {
  const navbarRef = useRef<HTMLUListElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (onMenu) onMenu(showMenu);
  }, [onMenu, showMenu]);

  return (
    <nav
      className={cx(
        'flex flex-col bg-primary text-primary-content transition-all duration-300',
        showMenu ? 'pb-16' : 'pb-0',
      )}
    >
      <div className="flex items-center justify-between p-6">
        <HamburToggle onClick={() => setShowMenu(!showMenu)} />
        {children && <div>{children}</div>}
      </div>
      <Dropdown show={showMenu} nodeRef={navbarRef}>
        <ul
          className="flex flex-col items-stretch p-5 text-center text-xl underline *:p-4 *:font-bold"
          ref={navbarRef}
        >
          {!isMain && (
            <Link to="/">
              <li> Página Principal </li>
            </Link>
          )}
          <Link to="/search">
            <li> Artículos </li>
          </Link>
          <Link to="/authors">
            <li> Autores </li>
          </Link>
          <Link to="/about">
            <li> Acerca de... </li>
          </Link>
        </ul>
      </Dropdown>
    </nav>
  );
}

import { useState } from 'react';

import { links } from '../../data/navigation';

import Logo from './Logo';
import LinkButton from '../LinkButton/LinkButton';
import BurgerButton from './BurgerButton';
import MobileMenu from './MobileMenu';

import './Header.scss';

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <Logo />
          </div>
          <nav
            id="main-navigation"
            className="header__nav"
            aria-label="Main navigation">
            <ul className="header__nav-list">
              {links.map((link) => (
                <li
                  className="header__nav-item"
                  key={link.href}>
                  <a
                    className="header__nav-link"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <BurgerButton
            isOpen={isMenuOpen}
            onClick={toggleMenu}
          />
          <LinkButton
            text="Get a Quote"
            href='#contacts'
          />
        </div>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </header>
  );
};

export default Header;


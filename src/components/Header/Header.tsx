
import LinkButton from '../LinkButton/LinkButton';
import Logo from './Logo';

import './Header.scss';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us'},
  { href: '#projects', label: 'Projects' },
  { href: '#contacts', label: 'Contacts' },
];

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {links.map((link) => (
                <li key={link.href}>
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
          <LinkButton text="Get a Quote" href='#contacts' />
        </div>
      </div>
    </header>
  );
};


export default Header;


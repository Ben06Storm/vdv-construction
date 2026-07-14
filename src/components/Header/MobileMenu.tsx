import { useEffect } from 'react';

import { links } from '../../data/navigation';

import LinkButton from '../LinkButton/LinkButton';

import './MobileMenu.scss';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({
  isOpen,
  onClose,
}: MobileMenuProps) => {

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`mobile-menu__backdrop ${
          isOpen ? 'mobile-menu__backdrop--visible' : ''
        }`}
        onClick={onClose}
      />
      <aside
        className={`mobile-menu ${
          isOpen ? 'mobile-menu--open' : ''
        }`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-menu__list">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="mobile-menu__link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LinkButton
          text="Get a Quote"
          href="#contacts"
        />
      </aside>
    </>
  );
};

export default MobileMenu;
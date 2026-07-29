import { Link } from 'react-router-dom';

import Logo from '../Header/Logo';
import './Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <Link
            to="/"
            className="footer__logo"
          >
            <Logo />
          </Link>
          <p className="footer__copyright">
            © {year} VDV Construction. All rights reserved.
          </p>
          <nav className="footer__nav">
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
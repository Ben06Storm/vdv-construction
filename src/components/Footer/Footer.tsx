import Logo from '../Header/Logo';
import './Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="container">

        <div className="footer__wrapper">

          <a
            href="#home"
            className="footer__logo"
          >
            <Logo />
          </a>

          <p className="footer__copyright">
            © {year} VDV Construction. All rights reserved.
          </p>

          <nav className="footer__nav">

            <a href="#privacy">
              Privacy Policy
            </a>

            <a href="#terms">
              Terms of Service
            </a>

          </nav>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
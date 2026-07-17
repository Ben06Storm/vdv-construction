
import { contactInfo } from '../../data/contactInfo';

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa6';

import SectionTitle from '../SectionTitle/SectionTitle';
import ContactInfo from '../ContactInfo/ContactInfo';
import ContactForm from '../ContactForm/ContactForm';

import './Contact.scss';

const Contact = () => {

  return (
    <section
      className="contact"
      id="contacts"
    >
      <div className="container">
        <div className="contact__wrapper">
          <div className="contact__info">
            <SectionTitle
              subtitle="GET IN TOUCH"
              title="Let's Build Something Beautiful"
              centered={false}
              showDivider={false}
              variant="light"
            />
            <p className="contact__description">
              Contact us today for a free estimate and let's
              bring your vision to life.
            </p>
          </div>
          <div className="contact__form">
            <ContactForm />
          </div>
          <div className="contact__items">
            {contactInfo.map(item => (
              <ContactInfo
                key={item.text}
                {...item} />
            ))}
          </div>
          <div className="contact__socials">
            <a
              href="https://instagram.com/your_page"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://facebook.com/your_page"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social"
            >
              <FaFacebookF size={22} />
            </a>
            <a
              href="https://twitter.com/your_page"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social"
            >
              <FaTwitter size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
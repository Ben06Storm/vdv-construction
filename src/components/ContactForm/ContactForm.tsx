import { useState } from 'react';
import { projectOptions } from '../../data/projectOptions';

import CustomSelect from '../CustomSelect/CustomSelect';

import './ContactForm.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError('');

    try {
 // TODO: replace with a real request, e.g. fetch() or axios

      setSuccess(true);

      setFormData({
        name: '',
        phone: '',
        email: '',
        project: '',
        message: '',
      });

    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="contactForm"
      onSubmit={handleSubmit}
    >

      <div className="contactForm__row">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

      </div>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <CustomSelect
        placeholder="Select Project Type"
        options={projectOptions}
        value={formData.project}
        onChange={(value) =>
          setFormData(prev => ({
            ...prev,
            project: value,
          }))
        }
      />

      <textarea
        name="message"
        rows={5}
        placeholder="Tell us about your project"
        value={formData.message}
        onChange={handleChange}
      />

      <button
        className='contactForm__button'
        type="submit"
        disabled={loading}
      >
        {loading
          ? 'Sending...'
          : 'GET A FREE QUOTE'}
      </button>

      {success && (
        <p className="contactForm__success">
          Your request has been sent successfully!
        </p>
      )}

      {error && (
        <p className="contactForm__error">
          {error}
        </p>
      )}

    </form>
  );
};

export default ContactForm;
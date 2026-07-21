import { useState } from 'react';

import { projectOptions } from '../../data/projectOptions';
import {
  validateForm,
  type FormErrors,
} from '../../utils/validation';

import CustomSelect from '../CustomSelect/CustomSelect';

import './ContactForm.scss';

type FormData = {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
};

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  project: '',
  message: '',
};

const ContactForm = () => {
  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: undefined,
    }));

    setError('');
    setSuccess(false);
  };

  const handleProjectChange = (
    value: string,
  ) => {
    setFormData(prev => ({
      ...prev,
      project: value,
    }));

    setErrors(prev => ({
      ...prev,
      project: undefined,
    }));

    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError('');

    const validationErrors =
      validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      // await sendForm(formData);

      setSuccess(true);
      setFormData(initialFormData);

    } catch {
      setError(
        'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="contactForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="contactForm__row">
        <div className="contactForm__field">
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={
              errors.name
                ? 'contactForm__input contactForm__input--error'
                : 'contactForm__input'
            }
          />

          {errors.name && (
            <p className="contactForm__error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="contactForm__field">
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={
              errors.phone
                ? 'contactForm__input contactForm__input--error'
                : 'contactForm__input'
            }
          />

          {errors.phone && (
            <p className="contactForm__error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="contactForm__field">
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={
            errors.email
              ? 'contactForm__input contactForm__input--error'
              : 'contactForm__input'
          }
        />

        {errors.email && (
          <p className="contactForm__error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="contactForm__field">
        <CustomSelect
          placeholder="Select Project Type"
          options={projectOptions}
          value={formData.project}
          onChange={handleProjectChange}
        />

        {errors.project && (
          <p className="contactForm__error">
            {errors.project}
          </p>
        )}
      </div>

      <div className="contactForm__field">
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          className={
            errors.message
              ? 'contactForm__input contactForm__input--error'
              : 'contactForm__input'
          }
        />

        {errors.message && (
          <p className="contactForm__error">
            {errors.message}
          </p>
        )}
        {success && (
          <p className="contactForm__success">
            Your request has been sent successfully!
          </p>
        )}

        {error && (
          <p className="contactForm__server-error">
            {error}
          </p>
        )}
      </div>

      <button
        className="contactForm__button"
        type="submit"
        disabled={loading}
      >
        {loading
          ? 'Sending...'
          : 'GET A FREE QUOTE'}
      </button>
    </form>
  );
};

export default ContactForm;
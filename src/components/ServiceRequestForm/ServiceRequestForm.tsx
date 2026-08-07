import { useState } from 'react';

import {
  isValidEmail,
  isValidPhone,
} from '../../utils/validation';
import type {
  ServiceRequestFormData,
} from '../../types/forms';
import { submitServiceRequest } from '../../api/serviceRequestApi';

import './ServiceRequestForm.scss';

type ServiceRequestFormProps = {
  serviceTitle: string;
};

const initialFormData: ServiceRequestFormData = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

const ServiceRequestForm = ({
  serviceTitle,
}: ServiceRequestFormProps) => {
  const [formData, setFormData] =
    useState<ServiceRequestFormData>(initialFormData);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } =
      event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSuccess(false);
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!formData.phone.trim()) {
      setError(
        'Please enter your phone number.',
      );
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setError(
        'Please enter a valid phone number.',
      );
      return;
    }

    if (!formData.email.trim()) {
      setError(
        'Please enter your email address.',
      );
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError(
        'Please enter a valid email address.',
      );
      return;
    }

    setLoading(true);

    try {

await submitServiceRequest({
  ...formData,
  service: serviceTitle,
});

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
    <div className="service-request-form">
      <p className="service-request-form__subtitle">
        REQUEST A SERVICE
      </p>

      <h3 className="service-request-form__title">
        {serviceTitle}
      </h3>

      <p className="service-request-form__description">
        Leave your details below and our team
        will contact you to discuss your{' '}
        {serviceTitle.toLowerCase()} project.
      </p>

      <form
        className="service-request-form__form"
        onSubmit={handleSubmit}
        noValidate
      >        {success && (
        <p className="service-request-form__success">
          Your request has been sent successfully!
        </p>
      )}

        {error && (
          <p className="service-request-form__error">
            {error}
          </p>
        )}
        <div className="service-request-form__row">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          rows={4}
          placeholder={`Tell us more about your ${serviceTitle.toLowerCase()} request`}
          value={formData.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Sending...'
            : 'SEND REQUEST'}
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
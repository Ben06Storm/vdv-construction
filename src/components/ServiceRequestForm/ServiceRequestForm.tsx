import { useState } from 'react';

import {
  validateServiceRequestForm,
  type BaseFormErrors,
} from '../../utils/validation';
import type { ServiceRequestFormData } from '../../types/forms';
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
  const [errors, setErrors] = useState<BaseFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
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

    const validationErrors =
      validateServiceRequestForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await submitServiceRequest({
        ...formData,
        service: serviceTitle,
      });

      setSuccess(true);
      setFormData(initialFormData);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-request-form">
      <p className="service-request-form__subtitle">
        Request a service
      </p>
      <h3 className="service-request-form__title">
        {serviceTitle}
      </h3>
      <p className="service-request-form__description">
        Leave your details below and our team will contact you
        to discuss your {serviceTitle.toLowerCase()} project.
      </p>

      <form
        className="service-request-form__form"
        onSubmit={handleSubmit}
        noValidate
      >
        {success && (
          <p className="service-request-form__success">
            Your request has been sent successfully!
          </p>
        )}

        {error && (
          <p className="service-request-form__error">{error}</p>
        )}

        <div className="service-request-form__row">
          <div className="service-request-form__field">
            <label htmlFor="service-name">Your name</label>
            <input
              id="service-name"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="service-request-form__field-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="service-request-form__field">
            <label htmlFor="service-phone">Phone number</label>
            <input
              id="service-phone"
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="service-request-form__field-error">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="service-request-form__field">
          <label htmlFor="service-email">Email address</label>
          <input
            id="service-email"
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="service-request-form__field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="service-request-form__field">
          <label htmlFor="service-message">Project details</label>
          <textarea
            id="service-message"
            name="message"
            rows={4}
            placeholder={`Tell us more about your ${serviceTitle.toLowerCase()} request`}
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <p className="service-request-form__field-error">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send request'}
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
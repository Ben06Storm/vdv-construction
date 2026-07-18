import { useState } from 'react';

import './ServiceRequestModal.scss';

type ServiceRequestModalProps = {
  serviceTitle: string | null;
  onClose: () => void;
};

const ServiceRequestModal = ({
  serviceTitle,
  onClose,
}: ServiceRequestModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!serviceTitle) {
    return null;
  }

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
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      // fetch() sau axios

      console.log({
        service: serviceTitle,
        ...formData,
      });

      setSuccess(true);

      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });

    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="service-request-modal"
      onClick={handleClose}
    >
      <div
        className="service-request-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="service-request-modal__close"
          onClick={handleClose}
          aria-label="Close form"
          type="button"
        >
          ✕
        </button>

        <p className="service-request-modal__subtitle">
          REQUEST A SERVICE
        </p>

        <h3 className="service-request-modal__title">
          {serviceTitle}
        </h3>

        <p className="service-request-modal__description">
          Leave your details below and our team will contact
          you to discuss your {serviceTitle.toLowerCase()} project.
        </p>

        <form
          className="serviceRequestForm"
          onSubmit={handleSubmit}
        >
          <div className="serviceRequestForm__row">
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

          <textarea
            name="message"
            rows={4}
            placeholder={`Tell us more about your ${serviceTitle.toLowerCase()} request`}
            value={formData.message}
            onChange={handleChange}
          />

          <button
            className="serviceRequestForm__button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Sending...'
              : 'SEND REQUEST'}
          </button>

          {success && (
            <p className="serviceRequestForm__success">
              Your request has been sent successfully!
            </p>
          )}

          {error && (
            <p className="serviceRequestForm__error">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestModal;
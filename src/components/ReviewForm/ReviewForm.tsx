import { useState } from 'react';
import { Star } from 'lucide-react';

import './ReviewForm.scss';

export type ReviewFormData = {
  name: string;
  city: string;
  rating: number;
  review: string;
};

type ReviewFormProps = {
  onSubmit: (data: ReviewFormData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
};

const initialFormData: ReviewFormData = {
  name: '',
  city: '',
  rating: 0,
  review: '',
};

const ReviewForm = ({
  onSubmit,
  isSubmitting,
  error,
}: ReviewFormProps) => {
  const [formData, setFormData] =
    useState<ReviewFormData>(initialFormData);

  const [validationError, setValidationError] =
    useState('');

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

    setValidationError('');
  };

  const handleRating = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));

    setValidationError('');
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setValidationError('');

    if (!formData.name.trim()) {
      setValidationError(
        'Please enter your name.',
      );
      return;
    }

    if (!formData.city.trim()) {
      setValidationError(
        'Please enter your city.',
      );
      return;
    }

    if (formData.rating === 0) {
      setValidationError(
        'Please select a rating.',
      );
      return;
    }

    if (!formData.review.trim()) {
      setValidationError(
        'Please write your review.',
      );
      return;
    }

    await onSubmit(formData);

    setFormData(initialFormData);
  };

  return (
    <div className="review-form">
      <p className="review-form__subtitle">
        SHARE YOUR EXPERIENCE
      </p>

      <h3 className="review-form__title">
        Leave a Review
      </h3>

      <p className="review-form__description">
        We would love to hear about your experience
        with us.
      </p>

      <form
        className="review-form__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="review-form__row">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            autoComplete="address-level2"
          />
        </div>

        <div className="review-form__rating">
          <p className="review-form__rating-title">
            Your Rating
          </p>

          <div
            className="review-form__stars"
            role="radiogroup"
            aria-label="Rating"
          >
            {Array.from(
              { length: 5 },
              (_, index) => {
                const rating = index + 1;

                return (
                  <button
                    key={rating}
                    type="button"
                    className={
                      rating <= formData.rating
                        ? 'review-form__star review-form__star--active'
                        : 'review-form__star'
                    }
                    onClick={() =>
                      handleRating(rating)
                    }
                    role="radio"
                    aria-checked={
                      rating === formData.rating
                    }
                    aria-label={`${rating} stars`}
                  >
                    <Star
                      size={24}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                );
              },
            )}
          </div>
        </div>

        <textarea
          name="review"
          rows={5}
          placeholder="Tell us about your experience..."
          value={formData.review}
          onChange={handleChange}
        />

        <button
          className="review-form__button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Submitting...'
            : 'SUBMIT REVIEW'}
        </button>

        {validationError && (
          <p className="review-form__error">
            {validationError}
          </p>
        )}

        {error && (
          <p className="review-form__error">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
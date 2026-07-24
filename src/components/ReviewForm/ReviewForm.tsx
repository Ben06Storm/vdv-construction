import { useState } from 'react';
import type {
  ReviewFormData,
} from '../../types/forms';

import RatingStars from '../RatingStars/RatingStars';

import './ReviewForm.scss';


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
          <RatingStars
            rating={formData.rating}
            className="review-form__stars"
            interactive
            onRatingChange={handleRating}
          />
        </div>
        <textarea
          name="review"
          rows={5}
          placeholder="Tell us about your experience..."
          value={formData.review}
          onChange={handleChange}
        />
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
        <button
          className="review-form__button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Submitting...'
            : 'SUBMIT REVIEW'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
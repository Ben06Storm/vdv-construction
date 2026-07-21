import { useRef, useState } from 'react';

import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import {
  Pagination,
} from 'swiper/modules';

import type { Swiper as SwiperType } from 'swiper';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

import { reviewsCards } from '../../data/reviews';

import SectionTitle from '../SectionTitle/SectionTitle';
import ReviewCard from '../ReviewCard/ReviewCard';
import Modal from '../Modal/Modal';
import ReviewForm, {
  type ReviewFormData,
} from '../ReviewForm/ReviewForm';
import RatingStars from '../RatingStars/RatingStars';

import './Reviews.scss';

type ReviewItem = (typeof reviewsCards)[number];

const Reviews = () => {
  const swiperRef =
    useRef<SwiperType | null>(null);

  const [selectedReview, setSelectedReview] =
    useState<ReviewItem | null>(null);

  const [isReviewFormOpen, setIsReviewFormOpen] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const handleOpenReview = (
    review: ReviewItem,
  ) => {
    setSelectedReview(review);
  };

  const handleCloseReview = () => {
    setSelectedReview(null);
  };

  const handleOpenReviewForm = () => {
    setSubmitError(null);
    setIsReviewFormOpen(true);
  };

  const handleCloseReviewForm = () => {
    if (isSubmitting) {
      return;
    }

    setSubmitError(null);
    setIsReviewFormOpen(false);
  };

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleReviewSubmit = async (
    data: ReviewFormData,
  ) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log(data);

      // await reviewService.create(data);

      setIsReviewFormOpen(false);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="reviews"
      id="reviews"
    >
      <div className="container">
        <SectionTitle
          subtitle="WHAT OUR CLIENTS SAY"
          title="Trusted by Our Clients"
          centered
          showDivider
        />

        <div className="reviews__actions">
          <button
            type="button"
            className="reviews__leave-review"
            onClick={handleOpenReviewForm}
          >
            Leave a Review
          </button>
        </div>

        <div className="reviews__carousel">
          <button
            type="button"
            className="
              reviews__arrow
              reviews__arrow--prev
            "
            onClick={handlePrevious}
            aria-label="Previous reviews"
          >
            <ChevronLeft
              size={28}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>

          <div className="reviews__slider">
            <Swiper
              modules={[Pagination]}
              onSwiper={(instance) => {
                swiperRef.current = instance;
              }}
              slidesPerView={1}
              spaceBetween={24}
              slidesPerGroup={1}
              speed={600}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                601: {
                  slidesPerView: 2,
                },
                993: {
                  slidesPerView: 3,
                },
              }}
            >
              {reviewsCards.map((item) => (
                <SwiperSlide key={item.id}>
                  <ReviewCard
                    {...item}
                    onReadMore={() =>
                      handleOpenReview(item)
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            className="
              reviews__arrow
              reviews__arrow--next
            "
            onClick={handleNext}
            aria-label="Next reviews"
          >
            <ChevronRight
              size={28}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>

        <Modal
          isOpen={Boolean(selectedReview)}
          onClose={handleCloseReview}
          ariaLabel="Customer review"
        >
          {selectedReview && (
            <div className="review-modal">
              <RatingStars
                rating={selectedReview.rating}
                className="review-modal__stars"
              />

              <p className="review-modal__review">
                {selectedReview.review}
              </p>

              <h3 className="review-modal__name">
                {selectedReview.name}
              </h3>

              <p className="review-modal__city">
                {selectedReview.city}
              </p>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={isReviewFormOpen}
          onClose={handleCloseReviewForm}
          ariaLabel="Leave a review"
        >
          <ReviewForm
            onSubmit={handleReviewSubmit}
            isSubmitting={isSubmitting}
            error={submitError}
          />
        </Modal>
      </div>
    </section>
  );
};

export default Reviews;
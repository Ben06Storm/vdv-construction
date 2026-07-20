import { useState } from 'react';

import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import {
  Pagination,
} from 'swiper/modules';

import type { Swiper as SwiperType } from 'swiper';

import {
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

import { reviewsCards } from '../../data/reviews';

import SectionTitle from '../SectionTitle/SectionTitle';
import ReviewCard from '../ReviewCard/ReviewCard';
import Modal from '../Modal/Modal';

import './Reviews.scss';

const Reviews = () => {
  const [swiper, setSwiper] =
    useState<SwiperType | null>(null);

  const [selectedReview, setSelectedReview] =
    useState<
      typeof reviewsCards[number] | null
    >(null);

  const handleOpenReview = (
    review: typeof reviewsCards[number],
  ) => {
    setSelectedReview(review);
  };

  const handleCloseReview = () => {
    setSelectedReview(null);
  };

  const handlePrevious = () => {
    swiper?.slidePrev();
  };

  const handleNext = () => {
    swiper?.slideNext();
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
              onSwiper={setSwiper}
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
              <div
                className="review-modal__stars"
                role="img"
                aria-label={`Rating: ${selectedReview.rating} out of 5`}
              >
                {Array.from(
                  { length: 5 },
                  (_, index) => (
                    <Star
                      key={index}
                      className={
                        index <
                          selectedReview.rating
                          ? `
                            review-modal__star
                            review-modal__star--active
                          `
                          : 'review-modal__star'
                      }
                      aria-hidden="true"
                    />
                  ),
                )}
              </div>
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
      </div>
    </section>
  );
};

export default Reviews;
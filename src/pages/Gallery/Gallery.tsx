import { useState, useMemo, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Navigation,
  Keyboard,
} from 'swiper/modules';

import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Modal from '../../components/Modal/Modal';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

import { galleryImages } from '../../data/galleryImages';
import { galleryCategories } from '../../data/galleryCategories';

import './Gallery.scss';

const ALL_CATEGORY = 'All';

const categoryOptions = [
  { value: ALL_CATEGORY, label: ALL_CATEGORY },
  ...galleryCategories.map(category => ({
    value: category,
    label: category,
  })),
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] =
    useState(ALL_CATEGORY);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [initialSlideIndex, setInitialSlideIndex] =
    useState(0);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const swiperRef =
    useRef<SwiperType | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? galleryImages
        : galleryImages.filter(
          image =>
            image.category === activeCategory,
        ),
    [activeCategory],
  );

  const hasMultipleImages = filteredImages.length > 1;
  const currentImage = filteredImages[currentSlide];

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentSlide(0);
    setInitialSlideIndex(0);
  };

  const handleOpenImage = (index: number) => {
    setInitialSlideIndex(index);
    setCurrentSlide(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSlide(0);
  };

  return (
    <section className="gallery-page">
      <div className="container">
        <SectionTitle
          subtitle="OUR WORK"
          title="Project Gallery"
          centered
          showDivider={false}
        />

        <div className="gallery-page__filters">
          <CustomSelect
            placeholder="Select Category"
            value={activeCategory}
            onChange={handleCategoryChange}
            options={categoryOptions}
          />
        </div>

        <div className="gallery-page__grid">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className="gallery-page__item"
              onClick={() => handleOpenImage(index)}
            >
              <img
                src={image.image}
                alt={image.title}
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          ariaLabel="Gallery image"
          variant="image"
        >
          {isModalOpen && currentImage && (
            <div className="gallery-page__modal">
              <Swiper
                modules={[Navigation, Keyboard]}
                initialSlide={initialSlideIndex}
                loop={hasMultipleImages}
                keyboard={{ enabled: true }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setCurrentSlide(swiper.realIndex);
                }}
                className="gallery-page__swiper"
              >
                {filteredImages.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img
                      className="gallery-page__preview"
                      src={image.image}
                      alt={image.title}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    className="gallery-page__nav gallery-page__nav--prev"
                    onClick={handlePrevious}
                    aria-label="Previous image"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    type="button"
                    className="gallery-page__nav gallery-page__nav--next"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              <div className="gallery-page__info">
                <h3>{currentImage.title}</h3>
                <p>{currentImage.category}</p>

                <span>
                  {currentSlide + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Gallery;
import { useEffect, useState, useCallback, useMemo } from 'react';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Modal from '../../components/Modal/Modal';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

import { galleryImages } from '../../data/galleryImages';
import { galleryCategories } from '../../data/galleryCategories';
import type { GalleryImage } from '../../types/gallery';

import './Gallery.scss';

const ALL_CATEGORY = 'All';

const getCyclicIndex = (
  current: number,
  delta: 1 | -1,
  length: number,
) => (current + delta + length) % length;

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

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

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

  const currentIndex = useMemo(
    () =>
      selectedImage
        ? filteredImages.findIndex(
          image => image.id === selectedImage.id,
        )
        : -1,
    [selectedImage, filteredImages],
  );

  const hasMultipleImages = filteredImages.length > 1;

  const handlePreviousImage = useCallback(() => {
    if (!selectedImage || !hasMultipleImages) {
      return;
    }

    const previousIndex = getCyclicIndex(
      currentIndex,
      -1,
      filteredImages.length,
    );

    setSelectedImage(filteredImages[previousIndex]);
  }, [selectedImage, hasMultipleImages, currentIndex, filteredImages]);

  const handleNextImage = useCallback(() => {
    if (!selectedImage || !hasMultipleImages) {
      return;
    }

    const nextIndex = getCyclicIndex(
      currentIndex,
      1,
      filteredImages.length,
    );

    setSelectedImage(filteredImages[nextIndex]);
  }, [selectedImage, hasMultipleImages, currentIndex, filteredImages]);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousImage();
      }

      if (event.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    selectedImage,
    handlePreviousImage,
    handleNextImage,
    handleCloseModal,
  ]);

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
            onChange={(category) => {
              setSelectedImage(null);
              setActiveCategory(category);
            }}
            options={categoryOptions}
          />
        </div>

        <div className="gallery-page__grid">
          {filteredImages.map(image => (
            <button
              key={image.id}
              type="button"
              className="gallery-page__item"
              onClick={() => setSelectedImage(image)}
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
          isOpen={Boolean(selectedImage)}
          onClose={handleCloseModal}
          ariaLabel="Gallery image"
          variant="image"
        >
          {selectedImage && (
            <div className="gallery-page__modal">
              <img
                className="gallery-page__preview"
                src={selectedImage.image}
                alt={selectedImage.title}
              />

              <div className="gallery-page__controls">
                {hasMultipleImages && (
                  <button
                    type="button"
                    className="gallery-page__nav gallery-page__nav--prev"
                    onClick={handlePreviousImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                )}

                <div className="gallery-page__content">
                  <h3 className="gallery-page__modal-title">
                    {selectedImage.title}
                  </h3>

                  <p className="gallery-page__modal-category">
                    {selectedImage.category}
                  </p>

                  {hasMultipleImages && (
                    <div className="gallery-page__counter">
                      {currentIndex + 1} / {filteredImages.length}
                    </div>
                  )}
                </div>

                {hasMultipleImages && (
                  <button
                    type="button"
                    className="gallery-page__nav gallery-page__nav--next"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Gallery;
import { useState } from 'react';

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

const Gallery = () => {
  const [activeCategory, setActiveCategory] =
    useState('All');

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter(
        image =>
          image.category === activeCategory,
      );

  const currentIndex = selectedImage
    ? filteredImages.findIndex(
      image => image.id === selectedImage.id,
    )
    : -1;

  const handlePreviousImage = () => {
    if (currentIndex <= 0) {
      return;
    }

    setSelectedImage(
      filteredImages[currentIndex - 1],
    );
  };

  const handleNextImage = () => {
    if (
      currentIndex === -1 ||
      currentIndex >= filteredImages.length - 1
    ) {
      return;
    }

    setSelectedImage(
      filteredImages[currentIndex + 1],
    );
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
            onChange={setActiveCategory}
            options={galleryCategories.map(
              category => ({
                value: category,
                label: category,
              }),
            )}
          />
        </div>

        <div className="gallery-page__grid">
          {filteredImages.map(image => (
            <button
              key={image.id}
              type="button"
              className="gallery-page__item"
              onClick={() =>
                setSelectedImage(image)
              }
            >
              <img
                src={image.image}
                alt={image.title}
              />
            </button>
          ))}
        </div>

        <Modal
          isOpen={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
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
                <button
                  type="button"
                  className="gallery-page__nav gallery-page__nav--prev"
                  onClick={handlePreviousImage}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft />
                </button>
                <div className="gallery-page__content">
                  <h3 className="gallery-page__modal-title">
                    {selectedImage.title}
                  </h3>

                  <p className="gallery-page__modal-category">
                    {selectedImage.category}
                  </p>
                  <div className="gallery-page__counter">
                    {currentIndex + 1} / {filteredImages.length}
                  </div>
                </div>
                <button
                  type="button"
                  className="gallery-page__nav gallery-page__nav--next"
                  onClick={handleNextImage}
                  disabled={
                    currentIndex === filteredImages.length - 1
                  }
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Gallery;
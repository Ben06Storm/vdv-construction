import { useEffect } from 'react';

import { X } from 'lucide-react';

import './ImageModal.scss';

type ImageModalProps = {
  image: string | null;
  title: string;
  onClose: () => void;
};

const ImageModal = ({
  image,
  title,
  onClose,
}: ImageModalProps) => {
  useEffect(() => {
    if (!image) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, onClose]);
  if (!image) {
    return null;
  }
  return (
    <div
      className="image-modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="image-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="image-modal__close"
          aria-label="Close image"
          onClick={onClose}
        >
          <X size={24} strokeWidth={2.5} />
        </button>
        <img
          className="image-modal__image"
          src={image}
          alt={title}
          decoding="async"
        />
      </div>
    </div>
  );
};

export default ImageModal;
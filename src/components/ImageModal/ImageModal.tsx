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
  if (!image) {
    return null;
  }

  return (
    <div
      className="image-modal"
      onClick={onClose}
    >
      <div
        className="image-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="image-modal__close"
          onClick={onClose}
          aria-label="Close image"
        >
          ✕
        </button>

        <img
          src={image}
          alt={title}
        />
      </div>
    </div>
  );
};

export default ImageModal;
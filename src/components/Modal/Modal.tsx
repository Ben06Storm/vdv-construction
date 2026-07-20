import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

import './Modal.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  variant?: 'default' | 'image';
};

const Modal = ({
  isOpen,
  onClose,
  children,
  ariaLabel = 'Modal',
  variant = 'default',
}: ModalProps) => {

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow = '';

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal modal--${variant}`}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <div
        className="modal__content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X
            size={24}
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
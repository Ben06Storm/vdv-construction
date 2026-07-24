import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import './BackToTop.scss';

const BackToTop = () => {
  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${
        isVisible
          ? 'back-to-top--visible'
          : ''
      }`}
      onClick={handleClick}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp
        size={22}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
};

export default BackToTop;
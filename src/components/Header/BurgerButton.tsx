import './BurgerButton.scss';

type BurgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const BurgerButton = ({
  isOpen,
  onClick,
}: BurgerButtonProps) => {
  return (
    <button
      type="button"
      className={`burger ${isOpen ? 'burger--open' : ''}`}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      aria-controls="main-navigation"
      onClick={onClick}
    >
      <span className="burger__line" />
      <span className="burger__line" />
      <span className="burger__line" />
    </button>
  );
};

export default BurgerButton;
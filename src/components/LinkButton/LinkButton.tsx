
import './LinkButton.scss';

type LinkButtonProps = {
  text: string;
  href: string;
  showArrow?: boolean;
};

const LinkButton = ({
  text,
  href,
  showArrow,
}: LinkButtonProps) => {
  return (
    <a href={href} className="link-btn">
      <span className="link-btn__text">
        {text}
      </span>

      {showArrow && (
        <span className="link-btn__arrow">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </a>
  );
};

export default LinkButton;

import { Link } from 'react-router-dom';

import './LinkButton.scss';

type LinkButtonProps = {
  text: string;
  href: string;
  showArrow?: boolean;
};

const LinkButton = ({
  text,
  href,
  showArrow = false,
}: LinkButtonProps) => {

  const content = (
    <>
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
    </>
  );

  if (href.startsWith('#') || href.startsWith('/#')) {
    return (
      <a
        href={href}
        className="link-btn"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="link-btn"
    >
      {content}
    </Link>
  );
};

export default LinkButton;

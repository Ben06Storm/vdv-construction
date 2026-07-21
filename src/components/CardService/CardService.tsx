import { ArrowRight } from 'lucide-react';

import './CardService.scss';

type CardServiceProps = {
  image: string;
  title: string;
  onRequest: (title: string) => void;
};

const CardService = ({
  image,
  title,
  onRequest,
}: CardServiceProps) => {
  const handleRequest = () => {
    onRequest(title);
  };
  return (
    <article className="service-card">
      <div className="service-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="service-card__content">
        <h3 className='service-card__title'>{title}</h3>
        <button            
        type="button"
          className="service-card__btn"
          onClick={handleRequest}>
          Explore Service
          <ArrowRight
            className="service-card__arrow"
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};

export default CardService;
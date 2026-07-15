
import './CardService.scss';

type CardServiceProps = {
  image: string;
  title: string;
  href?: string;
};

const CardService = ({ 
  image, 
  title, 
  href, 
}: CardServiceProps) => {
  return (
    <article className="service-card">
      <div className="service-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="service-card__content">
        <h3 className='service-card__title'>{title}</h3>
        <a href={href} className="service-card__link">
          Explore Service
          <span className="service-card__arrow">
            →
          </span>
        </a>
      </div>
    </article>
  );
};

export default CardService;
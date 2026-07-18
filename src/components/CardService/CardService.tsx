
import './CardService.scss';

type CardServiceProps = {
  image: string;
  title: string;
  href?: string;
  onRequest?: (title: string) => void;
};

const CardService = ({ 
  image, 
  title, 
  href, 
  onRequest,
}: CardServiceProps) => { 
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onRequest) {
     event.preventDefault();
      onRequest(title);
    }
  };
  return (
    <article className="service-card">
      <div className="service-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="service-card__content">
        <h3 className='service-card__title'>{title}</h3>
        <a href={href ?? '#contacts'} className="service-card__link" onClick={handleClick}>
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
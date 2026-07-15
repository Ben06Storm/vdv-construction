
import type { LucideIcon } from 'lucide-react';

import './WhyUsCard.scss';

type WhyUsCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const WhyUsCard = ({
  icon: Icon,
  title,
  text,
}: WhyUsCardProps) => {
  return (
    <article className="whyUsCard">
      <Icon
        aria-hidden = "true"
        className="whyUsCard__icon"
      />
      <h3 className="whyUsCard__title">
        {title}
      </h3>
      <p className="whyUsCard__text">
        {text}
      </p>
    </article>
  );
};

export default WhyUsCard;
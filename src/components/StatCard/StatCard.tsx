
import './StatCard.scss';

type StatCardProps = {
  value?: string;
  label: string;
  icon?: React.ElementType;
};

const StatCard = ({ 
  value,
  label, 
  icon: IconComponent, 
}: StatCardProps) => (
  <article className="stat-card">
    {IconComponent ? (
      <IconComponent className="stat-card__icon" />
    ) : (
      <h3 className="stat-card__value">{value}</h3>
    )}
    <p className="stat-card__label">{label}</p>
  </article>
);
export default StatCard;
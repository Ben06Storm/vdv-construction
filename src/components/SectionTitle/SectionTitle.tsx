import './SectionTitle.scss';

type SectionTitleProps = {
  subtitle: string;
  title: string;
  centered?: boolean;
  showDivider?: boolean;
  variant?: 'light' | 'dark';
};

const SectionTitle = ({
  subtitle,
  title,
  centered = true,
  showDivider = true,
  variant = 'dark',
}: SectionTitleProps) => {
  return (
    <div
      className={`
        section-title
        ${centered ? 'section-title--centered' : ''}
        section-title--${variant}
      `}
    >
      <p className="section-title__subtitle">
        {subtitle}
      </p>
      <h2
        className={`
          section-title__title
          ${!showDivider ? 'section-title__title--no-divider' : ''}
        `}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
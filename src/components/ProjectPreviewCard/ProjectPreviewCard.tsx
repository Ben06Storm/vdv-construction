

import './ProjectPreviewCard.scss';

type ProjectPreviewCardProps = {
  image: string;
  title: string;
  category: string;
  onImageClick: (image: string, title: string) => void;
};

const ProjectPreviewCard = ({
  image,
  title,
  category,
  onImageClick,
}: ProjectPreviewCardProps) => {
  return (
    <article className="project-preview-card">
      <button
        type="button"
        className="project-preview-card__image"
        onClick={() => onImageClick(image, title)}
        aria-label={`Open ${title} image`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
        />
      </button>
      <div className="project-preview-card__content">
        <p className="project-preview-card__category">
          {category}
        </p>
        <h3 className="project-preview-card__title">
          {title}
        </h3>
      </div>
    </article>
  );
};

export default ProjectPreviewCard;
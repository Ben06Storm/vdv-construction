/*import './ProjectPreviewCard.scss';

type ProjectCardProps = {
  image: string;
  title: string;
  category: string;
};

const ProjectPreviewCard = ({
  image,
  title,
  category,
}: ProjectCardProps) => {
  return (
    <article className="project-preview-card">
      <img
        src={image}
        alt={title}
        className="project-preview-card__image"
      />

      <div className="project-preview-card__content">
        <h3 className="project-preview-card__title">
          {title}
        </h3>

        <p className="project-preview-card__category">
          {category}
        </p>
      </div>
    </article>
  );
};

export default ProjectPreviewCard;*/

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
      <div className="project-preview-card__image"
        onClick={() => onImageClick(image, title)}
        >
        <img
          src={image}
          alt={title}
        />
      </div>

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
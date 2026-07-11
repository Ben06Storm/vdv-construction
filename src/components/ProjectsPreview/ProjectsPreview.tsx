import './ProjectsPreview.scss';

import SectionTitle from '../SectionTitle/SectionTitle';
import LinkButton from '../LinkButton/LinkButton';
import ProjectPreviewCard from '../ProjectPreviewCard/ProjectPreviewCard';

import { projects } from '../../data/projects';

import { useState } from 'react';

import ImageModal from '../ImageModal/ImageModal';


const ProjectsPreview = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleOpenImage = (
    image: string,
    title: string,
  ) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setSelectedTitle('');
  };

  return (

    <section className="projects-preview" id='projects'>

      <div className="container">

        <div className="projects-preview__wrapper">

          <div className="projects-preview__intro">

            <SectionTitle
              subtitle="RECENT PROJECTS"
              title="Our Latest Work"
              centered={false}
              showDivider={false}
              variant="light"
            />
            <div className="projects-preview__btn">
              <LinkButton
                text="View All Projects"
                href="#projects"
              />
            </div>
          </div>

          <div className="projects-preview__gallery">

            {projects.map(project => (
              <ProjectPreviewCard
                key={project.title}
                {...project}
                onImageClick={handleOpenImage}
              />
            ))}

          </div>
          <ImageModal
            image={selectedImage}
            title={selectedTitle}
            onClose={handleCloseImage}
          />

        </div>

      </div>

    </section>
  );
};

export default ProjectsPreview;
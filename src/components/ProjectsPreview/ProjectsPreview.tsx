import { useState } from 'react';

import { projects } from '../../data/projects';

import SectionTitle from '../SectionTitle/SectionTitle';
import LinkButton from '../LinkButton/LinkButton';
import ProjectPreviewCard from '../ProjectPreviewCard/ProjectPreviewCard';
import Modal from '../Modal/Modal';

import './ProjectsPreview.scss';

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
    <section className="projects-preview" id='projects-preview'>
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
            <div>
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
          <Modal
            isOpen={Boolean(selectedImage)}
            onClose={handleCloseImage}
            ariaLabel={selectedTitle}
            variant="image"
          >
            <img
              className="projects-preview__image"
              src={selectedImage ?? ''}
              alt={selectedTitle}
              decoding="async"
            />
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
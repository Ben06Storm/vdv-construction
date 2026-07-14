import { stats } from '../../data/stats';

import SectionTitle from '../SectionTitle/SectionTitle';
import LinkButton from '../LinkButton/LinkButton';
import StatCard from '../StatCard/StatCard';


import master from '../../assets/images/masterVDV.png';

import './AboutUs.scss';

const AboutUs = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__wrapper">

          <div className="about__content">
            <div className="about__title">
              <SectionTitle
                subtitle="ABOUT VDV CONSTRUCTION"
                title="Craftsmanship You Can See"
                centered={false}
                showDivider={false}
                variant="light"
              />
            </div>
            <p className="about__text">
              We are a team of skilled professionals dedicated to delivering
              high-end tile and construction solutions with unmatched attention
              to detail. From complex showers to large-format slabs, we bring
              precision and passion to every project.
            </p>

            <div className="about__btn">
              <LinkButton
                text="Learn More About Us"
                href="#contacts"
              />
            </div>
          </div>

          <div className="about__image">
            <img
              src={master}
              alt="VDV Construction craftsman"
            />
          </div>

          <div className="about__stats">
            {stats.map(stat => (
              <StatCard
                key={stat.label}
                {...stat}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
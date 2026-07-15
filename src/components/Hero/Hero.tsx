
import LinkButton from '../LinkButton/LinkButton';

import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero" id="home">
        <div className="hero__content">
          <p className="hero__tagline">BUILDING YOUR VISION</p>
          <h1 className="hero__title">WE BUILD QUALITY. YOU LIVE BETTER.</h1>
          <p className="hero__location">
            <span aria-hidden="true">——</span>
            Portland, Oregon & Vancouver, Washington
          </p>
          <p className="hero__subtitle">VDV Construction delivers modern, reliable and
            high-quality construction solutions.</p>

          <LinkButton
            text="View Projects"
            href="#projects"
            showArrow
          />
        </div>
    </section>
  );
};
export default Hero;

import LinkButton from '../LinkButton/LinkButton';
import './Home.scss';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <h3 className="hero__tagline">BILDING YOUR VISION</h3>
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
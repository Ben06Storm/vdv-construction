import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import AboutUs from '../../components/AboutUs/AboutUs';
import ProjectsPreview from '../../components/ProjectsPreview/ProjectsPreview';
import WhyUs from '../../components/WhyUs/WhyUs';
import Reviews from '../../components/Reviews/Reviews';
import Contacts from '../../components/Contact/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <AboutUs />
      <ProjectsPreview />
      <WhyUs />
      <Reviews />
      <Contacts />
    </main>
  );
};

export default Home;

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import AboutUs from './components/AboutUs/AboutUs';
import ProjectsPreview from './components/ProjectsPreview/ProjectsPreview';
import Projects from './components/Projects/Projects';
import WhyUs from './components/WhyUs/WhyUs';
import Reviews from './components/Reviews/Reviews';
import Contacts from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <AboutUs />
        <ProjectsPreview />
        <Projects />
        <WhyUs />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
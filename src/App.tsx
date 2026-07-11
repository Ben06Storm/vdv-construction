
import Header from './components/Header/Header';
import Hero from './components/Home/Home';
import Services from './components/Services/Services';
import AboutUs from './components/AboutUs/AboutUs';
import ProjectsPreview from './components/ProjectsPreview/ProjectsPreview';
import Projects from './components/Projects/Projects';
import Contacts from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import WhyUs from './components/WhyUs/WhyUs';

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
        <Contacts />
      </main>
      <Footer />
    </>
  );
};

export default App;
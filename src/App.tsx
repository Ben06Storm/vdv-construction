import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import ScrollToSection from './components/ScrollToSection/ScrollToSection';
import Gallery from './pages/Gallery/Gallery';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToSection />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="/terms-of-service"
          element={<TermsOfService />}
        />
        <Route
          path="/gallery"
          element={<Gallery />}
        />
      </Routes>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
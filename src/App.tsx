import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import ScrollToSection from './components/ScrollToSection/ScrollToSection';
import AdminLayout from './components/AdminLayout/AdminLayout';

import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Gallery from './pages/Gallery/Gallery';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import AdminReviews from './pages/admin/AdminReviews/AdminReviews';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <ScrollToSection />
              <Home />
              <Footer />
              <BackToTop />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <ScrollToSection />
              <PrivacyPolicy />
              <Footer />
              <BackToTop />
            </>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <>
              <Header />
              <ScrollToSection />
              <TermsOfService />
              <Footer />
              <BackToTop />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <Header />
              <ScrollToSection />
              <Gallery />
              <Footer />
              <BackToTop />
            </>
          }
        />

        <Route
          path="/admin/login"
          element={
            <AdminLayout>
              <AdminLogin />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminReviews />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
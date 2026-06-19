import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import Home from '@/pages/Home';
import PropertiesPage from '@/pages/PropertiesPage';
import PropertyDetail from '@/pages/PropertyDetail';

// Componente para controlar el scroll al cambiar de ruta
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Si hay un hash (ej: #propiedades), hacer scroll al elemento
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Si no hay hash, hacer scroll al inicio de la página
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScrollProvider>
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<PropertiesPage />} />
            <Route path="/propiedades/:id" element={<PropertyDetail />} />
          </Routes>
        </main>
        <Footer />
      </SmoothScrollProvider>
    </Router>
  );
}

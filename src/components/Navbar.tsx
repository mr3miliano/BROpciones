import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav 
      className={`${styles.navFixed} nav-glass ${
        isScrolled 
          ? styles.navScrolled 
          : ""
      }`}
    >
      <div className={styles.navContainer}>
        <div className={styles.navbar}>
          <Link to="/" className={styles.logoWrapper}>
            <img src="/logo.png" alt="Aura Hábitat Logo" className={styles.logoImage} style={{ height: "60px", objectFit: "contain" }} />
          </Link>
 
          <div className={styles.desktopMenu}>
            {[
              { name: "Inicio", href: "/" },
              { name: "Propiedades", href: "/#propiedades" },
              { name: "Nosotros", href: "/#nosotros" },
              { name: "Contacto", href: "/#contacto" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={styles.navLink}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/#propiedades"
              className={styles.exploreBtn}
            >
              Explorar
            </Link>
          </div>
 
          <div className={styles.mobileToggle}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.mobileToggleBtn}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {[
            { name: "Inicio", href: "/" },
            { name: "Propiedades", href: "/#propiedades" },
            { name: "Nosotros", href: "/#nosotros" },
            { name: "Contacto", href: "/#contacto" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={styles.mobileLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

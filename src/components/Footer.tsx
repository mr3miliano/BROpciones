import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const { pathname } = useLocation();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} glass`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <article className={styles.logoCard}>
              <Link to="/" className={styles.logoLink}>
                <img src="/logo.png" alt="Aura Hábitat Logo" className={styles.logoImage} style={{ height: "60px", objectFit: "contain" }} />
              </Link>
            </article>
            <p className={styles.desc}>
              Ofrecemos las propiedades residenciales y comerciales más exclusivas con un servicio boutique de primer nivel.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Navegación</h3>
            <ul className={styles.list}>
              <li><Link to="/" className={styles.link}>Inicio</Link></li>
              <li><Link to="/propiedades" className={styles.link}>Catálogo</Link></li>
              <li><Link to="/#nosotros" className={styles.link}>Nosotros</Link></li>
              <li><Link to="/#contacto" className={styles.link}>Contacto</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Categorías</h3>
            <ul className={styles.list}>
              <li><Link to="/propiedades?type=house" className={styles.link}>Residencias de Lujo</Link></li>
              <li><Link to="/propiedades?type=apartment" className={styles.link}>Departamentos Premium</Link></li>
              <li><Link to="/propiedades?type=commercial" className={styles.link}>Locales Comerciales</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contacto</h3>
            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <span>Lomas Altas, Ciudad de México</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />
              <a href="tel:+525512345678" className={styles.link}>+52 55 1234 5678</a>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <a href="mailto:info@aurahabitat.com" className={styles.link}>info@aurahabitat.com</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>&copy; {currentYear} Aura Hábitat Inmobiliaria. Excelencia en Bienes Raíces.</p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacidad</a>
            <a href="#" className={styles.bottomLink}>Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

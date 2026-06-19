import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProperties, Property } from "@/lib/db";
import SearchHero from "@/components/SearchHero";
import GlobalBackground from "@/components/GlobalBackground";
import { ScrollReveal } from "@/components/ScrollReveal";
import PropertiesPortfolio from "@/components/PropertiesPortfolio";
import styles from "../app/propiedades/PropertiesPage.module.css";

// Import images for background
import img1 from "@/app/img1.jpg";
import img2 from "@/app/img2.jpg";
import img3 from "@/app/img3.jpg";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error al cargar propiedades en PropertiesPage:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  const resolvedSearchParams = {
    status: searchParams.get("status") || undefined,
    type: searchParams.get("type") || undefined,
    location: searchParams.get("location") || undefined,
  };

  const backgroundImages = [img1, img2, img3];

  return (
    <div className={styles.page}>
      <GlobalBackground images={backgroundImages} />

      <div className={styles.content}>
        <section id="hero">
          <SearchHero />
        </section>

        <section id="propiedades" className={styles.catalogSection}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.header}>
                <span className={`${styles.badge} glass`}>
                  Catálogo Exclusivo
                </span>
                <h2 className={styles.title}>
                  Nuestras Propiedades
                </h2>
                <p className={styles.subtitle}>
                  Encuentra el hogar de tus sueños entre nuestra selección de residencias de vanguardia.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {loading ? (
            <div className="container flex justify-center py-20">
              <div className="text-xl text-amber-500 font-display">Cargando catálogo premium...</div>
            </div>
          ) : (
            <PropertiesPortfolio
              initialProperties={properties}
              searchParams={resolvedSearchParams}
            />
          )}
        </section>
      </div>
    </div>
  );
}

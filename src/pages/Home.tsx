import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProperties, Property } from "@/lib/db";
import ContactForm from "@/components/ContactForm";
import SearchHero from "@/components/SearchHero";
import GlobalBackground from "@/components/GlobalBackground";
import { ScrollReveal } from "@/components/ScrollReveal";
import PropertiesPortfolio from "@/components/PropertiesPortfolio";
import { CheckCircle, Users, Heart, Clock, Lightbulb, Trophy, ShieldCheck } from "lucide-react";
import styles from "../app/Home.module.css";

// Importar imágenes de propiedades
import img1 from "@/app/img1.jpg";
import img2 from "@/app/img2.jpg";
import img3 from "@/app/img3.jpg";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error al cargar propiedades en Home:", error);
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

      {/* Capa de Contenido */}
      <div className={styles.content}>

        {/* SECCIÓN 1: HERO / BUSCADOR */}
        <section id="hero">
          <SearchHero />
        </section>

        {/* SECCIÓN 2: CATÁLOGO COMPLETO */}
        <section id="propiedades" className={styles.section}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.header}>
                <span className={`${styles.badge} glass`}>
                  Portafolio Selecto
                </span>
                <h2 className={styles.title}>
                  Catálogo Completo
                </h2>
                <p className={styles.subtitle}>
                  Explora todas nuestras residencias exclusivas. Filtra y encuentra la propiedad perfecta.
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

        {/* SECCIÓN 3: NOSOTROS */}
        <section id="nosotros" className={styles.section} style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div className="container">
            <div className={`${styles.nosotrosContainer} glass`}>
              <ScrollReveal>
                <div className={styles.header}>
                  <span className={`${styles.badge} glass`}>
                    Nuestra Identidad
                  </span>
                  <h2 className={styles.title}>
                    Sobre Nosotros
                  </h2>
                </div>
              </ScrollReveal>

              <div className={styles.nosotrosGrid}>
                {[
                  {
                    title: "Propósito",
                    text: "Somos una empresa en donde nuestras ideas están impulsadas por grandes propósitos. Uno de los propósitos más importantes, es brindar a nuestros clientes la confianza, seguridad y credibilidad al asesorarlos y apoyarlos en las necesidades que se les presenten dentro del ramo inmobiliario, y no solo ofrecerles un producto o servicio que puedan comprar o vender, si no que puedan conseguir lo que buscan, sin que tengan que preocuparse por la legalidad de sus trámites."
                  },
                  {
                    title: "Visión",
                    text: "Ser una empresa líder, con presencia y amplio reconocimiento en su mercado por su alta calidad en el servicio inmobiliario, con precios competitivos de mercado, en el menor tiempo posible y libre de obstáculos, apegada a sus principios y valores, fomentando el desarrollo humano de sus integrantes, con capacitación de excelencia, en beneficio de sus clientes y de la empresa misma; creando con ello una amplia cartera de clientes satisfechos. Estamos comprometidos en jugar un rol preponderante en la responsabilidad social dentro de nuestro circulo de influencia."
                  },
                  {
                    title: "Misión",
                    text: "Nuestra misión está dirigida a satisfacer las necesidades inmobiliarias específicas de cada uno de nuestros clientes, brindando asesoría integral, comunicación clara y oportuna, tiempos óptimos de operación, puntualidad, así como el trato siempre amable y con el mayor respeto que el cliente nos merece, ocupándonos en que nuestro trabajo le sirva al cliente y que no nos sirvamos de él."
                  }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={0.2 * i}>
                    <div className={styles.nosotrosCard}>
                      <h3 className={styles.nosotrosCardTitle}>{item.title}</h3>
                      <p className={styles.nosotrosCardText}>{item.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className={styles.valoresSection}>
                <ScrollReveal>
                  <h3 className={styles.valoresTitle}>Nuestros Valores</h3>
                </ScrollReveal>
                <div className={styles.valoresGrid}>
                  {[
                    { icon: CheckCircle, title: "Honestidad", desc: "Ser honestos sobre vicios ocultos, precios y situaciones legales extraordinarias que involucren a las propiedades." },
                    { icon: ShieldCheck, title: "Confianza", desc: "Damos al cliente la confianza en que le ofreceremos un trato justo en relación precio inmueble o servicio." },
                    { icon: Users, title: "Responsabilidad", desc: "Colaboramos junto a nuestros clientes y equipo de trabajo para dar la seguridad y certeza de que nuestro profesionalismo y capacitación constante le asegurará la mejor experiencia." },
                    { icon: Heart, title: "Empatía", desc: "Ponernos en el lugar del cliente, para poder comprenderlo y así asesóralo de una manera adecuada en base a sus necesidades y ayudarlo a resolver sus posibles problemas inmobiliarios." },
                    { icon: Clock, title: "Puntualidad", desc: "Ser puntuales en nuestras citas y dar a tiempo la información requerida por el cliente." },
                    { icon: Lightbulb, title: "Innovación", desc: "Reinventar cada día nuestro trabajo, buscando la forma, los procesos y los medios que faciliten y catapulten los bienes inmuebles de nuestros clientes y para nuestros clientes." },
                    { icon: Trophy, title: "Liderazgo", desc: "Ser una empresa que siempre busca ir a la cabeza en el mercado inmobiliario, y apoyar a nuestros colaboradores reconociendo sus habilidades e impulsarlos para llegar a metas y objetivos específicos, buscando siempre ser los primeros." }
                  ].map((item, i) => (
                    <ScrollReveal key={i} delay={0.1 * i}>
                      <div className={styles.valorCard}>
                        <div className={styles.valorIconContainer}>
                          <item.icon size={24} className={styles.valorIcon} />
                        </div>
                        <h4 className={styles.valorTitle}>{item.title}</h4>
                        <p className={styles.valorDesc}>{item.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: CONTACTO */}
        <section id="contacto" className={styles.section}>
          <div className={`container ${styles.contactContainer}`}>
            <ScrollReveal>
              <div className={styles.header}>
                <h2 className={styles.title}>
                  Contáctanos
                </h2>
              </div>
            </ScrollReveal>
            <div className={`${styles.contactFormWrapper} glass`}>
              <ContactForm />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

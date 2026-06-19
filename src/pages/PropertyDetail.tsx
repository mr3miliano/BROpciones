import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, BedDouble, Bath, Maximize, MapPin, Sparkles, Calendar, Map as MapIcon } from "lucide-react";
import { getPropertyById, getAgentForProperty, Property, AgentContact } from "@/lib/db";
import PropertyContactActions from "@/components/PropertyContactActions";
import PropertyInlineForm from "@/components/PropertyInlineForm";
import PropertyGallery from "@/components/PropertyGallery";
import AgentCard from "@/components/AgentCard";
import GlobalBackground from "@/components/GlobalBackground";
import PropertyMapWrapper from "@/components/PropertyMapWrapper";
import styles from "../app/propiedades/[id]/PropertyDetail.module.css";

// Import images for background
import img1 from "@/app/img1.jpg";
import img2 from "@/app/img2.jpg";
import img3 from "@/app/img3.jpg";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [agent, setAgent] = useState<AgentContact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const propData = await getPropertyById(id);
        if (propData) {
          setProperty(propData);
          const agentData = await getAgentForProperty(propData.id);
          setAgent(agentData);
        }
      } catch (error) {
        console.error("Error al cargar detalles de propiedad:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.detailPage}>
        <GlobalBackground images={[img1, img2, img3]} />
        <div className="flex-grow flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-amber-500 font-display">Cargando detalles de la propiedad...</div>
        </div>
      </div>
    );
  }

  if (!property || !agent) {
    return (
      <div className={styles.detailPage}>
        <GlobalBackground images={[img1, img2, img3]} />
        <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h1 className="text-2xl font-bold text-slate-100 font-display">Propiedad no encontrada</h1>
          <p className="text-slate-400">La propiedad que buscas no existe o ha sido dada de baja.</p>
          <Link to="/propiedades" className="exploreBtn glass mt-2">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price) + ` ${currency}`;
  };

  const statusLabel = property.status === "sale" ? "Venta" : "Renta";
  const typeLabel = {
    house: "Casa",
    apartment: "Departamento",
    land: "Terreno",
    warehouse: "Bodega",
    commercial: "Local Comercial",
  }[property.type];

  const backgroundImages = [img1, img2, img3];

  return (
    <div className={styles.detailPage}>
      <GlobalBackground images={backgroundImages} />

      <div className={styles.contentWrapper}>
        <div className="container">
          
          <Link to="/propiedades" className={`${styles.backBtn} glass`}>
            <ChevronLeft size={18} className={styles.backIcon} />
            <span>Volver al Catálogo</span>
          </Link>

          <div className={styles.layout}>
            
            <div className={styles.mainCol}>
              <div className={styles.gallerySection}>
                <PropertyGallery
                  images={property.images}
                  title={property.title}
                  statusLabel={statusLabel}
                  typeLabel={typeLabel}
                  status={property.status}
                />
              </div>

              <div className={`${styles.infoSection} glass`}>
                <div className={styles.locationMeta}>
                  <span className={styles.metaIconContainer}>
                    <MapPin size={20} className={styles.metaIcon} />
                  </span>
                  <span>{property.location}</span>
                  <span className="divider-dot">•</span>
                  <span>{property.address}</span>
                </div>

                <h1 className={styles.title}>{property.title}</h1>

                <div className={styles.specsGrid}>
                  {property.bedrooms > 0 && (
                    <article className={styles.specItem}>
                      <span className={styles.specIcon}>
                        <BedDouble size={28} />
                      </span>
                      <span className={styles.specLabel}>Recámaras</span>
                      <span className={styles.specValue}>{property.bedrooms}</span>
                    </article>
                  )}
                  {property.bathrooms > 0 && (
                    <article className={styles.specItem}>
                      <span className={styles.specIcon}>
                        <Bath size={28} />
                      </span>
                      <span className={styles.specLabel}>Baños</span>
                      <span className={styles.specValue}>{property.bathrooms}</span>
                    </article>
                  )}
                  {property.area > 0 && (
                    <article className={styles.specItem}>
                      <span className={styles.specIcon}>
                        <Maximize size={28} />
                      </span>
                      <span className={styles.specLabel}>Superficie</span>
                      <span className={styles.specValue}>{property.area} m²</span>
                    </article>
                  )}
                </div>

                {property.lat && property.lng && (
                  <div className={styles.mapContainer}>
                    <h2 className={styles.sectionTitle}>
                      <span className={styles.metaIconContainer}>
                        <MapIcon size={24} className={styles.metaIcon} />
                      </span>
                      Ubicación Exacta
                    </h2>
                    <PropertyMapWrapper lat={property.lat} lng={property.lng} address={property.address} />
                  </div>
                )}
              </div>

              <div className={`${styles.descSection} glass`}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.metaIconContainer}>
                    <Sparkles size={24} className={styles.metaIcon} />
                  </span>
                  Descripción
                </h2>
                <p className={styles.descText}>{property.description}</p>
              </div>

              {property.features && property.features.length > 0 && (
                <div className={`${styles.amenitiesSection} glass`}>
                  <h2 className={styles.sectionTitle}>Amenidades Premium</h2>
                  <div className={styles.featuresGrid}>
                    {property.features.map((feature, i) => (
                      <div key={i} className={styles.featureItem}>
                        <div className={styles.featureDot} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.stickyCol}>
              <div className={`${styles.priceCard} glass`}>
                <div>
                  <span className={styles.priceLabel}>Inversión Exclusiva</span>
                  <div className={styles.priceValue}>
                    {formatPrice(property.price, property.currency)}
                  </div>
                </div>
                <div className={styles.divider} />

                {/* Tarjeta del Agente */}
                <AgentCard 
                  name={agent.name}
                  phone={agent.phone}
                  email={agent.email}
                  avatar={agent.avatar}
                />

                <div className={styles.divider} />

                <PropertyContactActions
                  propertyId={property.id}
                  propertyTitle={property.title}
                  propertyLocation={property.location}
                  agentName={agent.name}
                  agentPhone={agent.phone}
                />
              </div>

              <div className={`${styles.formCard} glass`}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.metaIconContainer}>
                    <Calendar size={20} className={styles.metaIcon} />
                  </span>
                  Solicitar Información
                </h3>
                <PropertyInlineForm propertyId={property.id} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

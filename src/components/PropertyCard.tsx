import { Link } from "react-router-dom";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { Property } from "@/lib/db";
import styles from "./PropertyCard.module.css";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
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

  return (
    <div className={`${styles.card} glass-card`}>
      <div className={styles.imageContainer}>
        <img
          src={property.images[0] || "/placeholder-property.jpg"}
          alt={property.title}
          className={styles.image}
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
        />
        
        <div className={styles.badgeContainer}>
          <span className={`${styles.statusBadge} ${property.status === "sale" ? styles.statusSale : styles.statusRent}`}>
            En {statusLabel}
          </span>
          <span className={styles.typeBadge}>
            {typeLabel}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.location}>
          <MapPin size={14} className={styles.locationIcon} />
          <span>{property.location}</span>
        </div>

        <h3 className={styles.title}>
          {property.title}
        </h3>

        <div className={styles.price}>
          {formatPrice(property.price, property.currency)}
        </div>

        <div className={styles.specs}>
          {property.bedrooms > 0 && (
            <div className={styles.specItem}>
              <BedDouble size={16} className={styles.specIcon} />
              <span>{property.bedrooms} rec.</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className={styles.specItem}>
              <Bath size={16} className={styles.specIcon} />
              <span>{property.bathrooms} bañ.</span>
            </div>
          )}
          {property.area > 0 && (
            <div className={styles.specItem}>
              <Maximize size={16} className={styles.specIcon} />
              <span>{property.area} m²</span>
            </div>
          )}
        </div>

        <Link
          to={`/propiedades/${property.id}`}
          className={styles.detailsBtn}
        >
          Ver Ficha Completa
        </Link>
      </div>
    </div>
  );
}

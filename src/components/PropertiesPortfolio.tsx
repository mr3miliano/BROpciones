"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, RotateCcw, AlertTriangle } from "lucide-react";
import { Property } from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import styles from "./PropertiesPortfolio.module.css";

interface PropertiesPortfolioProps {
  initialProperties: Property[];
  searchParams?: {
    status?: string;
    type?: string;
    location?: string;
  };
}

export default function PropertiesPortfolio({
  initialProperties,
  searchParams,
}: PropertiesPortfolioProps) {
  const [status, setStatus] = useState(searchParams?.status || "");
  const [type, setType] = useState(searchParams?.type || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleReset = () => {
    setStatus("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
  };

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((prop) => {
      if (status && prop.status !== status) return false;
      if (type && prop.type !== type) return false;
      if (bedrooms) {
        const bedsNum = parseInt(bedrooms);
        if (prop.bedrooms < bedsNum) return false;
      }
      if (minPrice) {
        const min = parseFloat(minPrice);
        if (prop.price < min) return false;
      }
      if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (prop.price > max) return false;
      }
      return true;
    });
  }, [initialProperties, status, type, bedrooms, minPrice, maxPrice]);

  return (
    <div className={styles.portfolioContainer}>
      {/* Botón de Filtros para Móviles */}
      <div className={styles.mobileFilterToggle}>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={styles.mobileFilterBtn}
        >
          <SlidersHorizontal size={18} />
          <span>{showMobileFilters ? "Ocultar Filtros" : "Mostrar Filtros"}</span>
        </button>
      </div>

      <div className={styles.portfolioGrid}>

        <aside className={`${styles.sidebar} ${showMobileFilters ? styles.sidebarOpen : ""} glass`}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>
              <SlidersHorizontal size={18} className={styles.filterIcon} />
              Filtros
            </h2>
            <button onClick={handleReset} className={styles.resetBtn}>
              <RotateCcw size={14} />
              Limpiar
            </button>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Operación</label>
            <div className={styles.btnGroup}>
              <button
                onClick={() => setStatus(status === "sale" ? "" : "sale")}
                className={`${styles.filterBtn} ${status === "sale" ? styles.filterBtnActive : ""}`}
              >
                Venta
              </button>
              <button
                onClick={() => setStatus(status === "rent" ? "" : "rent")}
                className={`${styles.filterBtn} ${status === "rent" ? styles.filterBtnActive : ""}`}
              >
                Renta
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Tipo de Inmueble</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={styles.select}
            >
              <option value="">Todos los tipos</option>
              <option value="house">Casa</option>
              <option value="apartment">Departamento</option>
              <option value="land">Terreno</option>
              <option value="warehouse">Bodega</option>
              <option value="commercial">Local Comercial</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Precio (USD)</label>
            <div className={styles.btnGroup}>
              <input
                type="number"
                placeholder="Mín"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Máx"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Recámaras</label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className={styles.select}
            >
              <option value="">Cualquiera</option>
              <option value="1">1+ recámaras</option>
              <option value="2">2+ recámaras</option>
              <option value="3">3+ recámaras</option>
              <option value="4">4+ recámaras</option>
            </select>
          </div>
        </aside>

        <div className={styles.contentCol}>
          <p className={styles.resultsCount}>
            <span className={styles.resultsCountHighlight}>{filteredProperties.length}</span> propiedades encontradas
          </p>

          {filteredProperties.length > 0 ? (
            <div className={styles.resultsGrid}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className={`${styles.noResults} glass`}>
              <AlertTriangle size={48} className={styles.filterIcon} />
              <h3 className={styles.noResultsTitle}>Sin Resultados</h3>
              <p className={styles.noResultsText}>No encontramos propiedades que coincidan.</p>
              <button onClick={handleReset} className={styles.resetBtnCatalog}>
                Ver Todo el Catálogo
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, MapPin, Building, Tag } from "lucide-react";
import styles from "./SearchHero.module.css";

export default function SearchHero() {
  const [status, setStatus] = useState("sale");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const section = document.getElementById("propiedades");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.heroContainer}>
      <div className={styles.content}>
        <div className={`${styles.searchPanel} glass`}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Tag className={styles.labelIcon} size={14} />
                Operación
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.select}
              >
                <option value="sale">Venta</option>
                <option value="rent">Renta</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Building className={styles.labelIcon} size={14} />
                Tipo
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={styles.select}
              >
                <option value="">Todos</option>
                <option value="house">Casa</option>
                <option value="apartment">Departamento</option>
                <option value="land">Terreno</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MapPin className={styles.labelIcon} size={14} />
                Lugar
              </label>
              <input
                type="text"
                placeholder="Polanco, CDMX..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.searchButton}>
              <Search size={22} />
              <span>Buscar</span>
            </button>
          </form>
        </div>

        <div className={styles.heroTextContainer}>
          <span className={`${styles.badge} glass`}>
            Propiedades de Vanguardia
          </span>
          <h1 className={styles.title}>
            “NO SOMOS LA UNICA OPCION <span className={styles.titleAccent}>PERO SI LA MEJOR”</span>
          </h1>
          <p className={styles.subtitle}>
            Encuentra residencias exclusivas que trascienden el tiempo y el espacio.
          </p>
        </div>
      </div>
    </section>
  );
}

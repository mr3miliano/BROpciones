"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo salió mal.");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Error al enviar el formulario.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successBox}>
        <div className={styles.successIconContainer}>
          <CheckCircle2 size={48} color="#10b981" />
        </div>
        <h3 className={styles.successTitle}>¡Mensaje Enviado!</h3>
        <p className={styles.successText}>
          Un asesor inmobiliario se pondrá en contacto contigo muy pronto.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className={styles.resetBtn}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && (
        <div className={styles.errorBox}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Nombre Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>Teléfono Móvil</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+52 55 1234 5678"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="juan.perez@ejemplo.com"
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="message" className={styles.label}>Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Cuéntanos en qué podemos ayudarte..."
          className={styles.textarea}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={styles.submitBtn}
      >
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          <Send size={20} />
        )}
        <span>ENVIAR SOLICITUD</span>
      </button>
    </form>
  );
}

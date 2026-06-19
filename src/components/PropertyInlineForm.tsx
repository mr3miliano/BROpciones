"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./PropertyInlineForm.module.css";

interface PropertyInlineFormProps {
  propertyId: string;
}

export default function PropertyInlineForm({ propertyId }: PropertyInlineFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Deseo recibir más información sobre esta propiedad y agendar una visita a la brevedad.",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        body: JSON.stringify({
          ...formData,
          propertyId,
          method: "form",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo salió mal.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "Deseo recibir más información sobre esta propiedad y agendar una visita a la brevedad.",
      });
    } catch (err: any) {
      setError(err.message || "Error al enviar el formulario.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successBox}>
        <CheckCircle2 size={32} color="#10b981" />
        <h4 className={styles.successTitle}>¡Solicitud Enviada!</h4>
        <p className={styles.successText}>
          Un asesor se comunicará contigo para confirmar la fecha y hora de la cita.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && (
        <div className={styles.errorBox}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <input
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
        placeholder="Tu Nombre Completo"
        className={styles.input}
      />

      <input
        type="tel"
        name="phone"
        required
        value={formData.phone}
        onChange={handleChange}
        placeholder="Tu Teléfono (WhatsApp)"
        className={styles.input}
      />

      <input
        type="email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
        placeholder="Tu Correo Electrónico"
        className={styles.input}
      />

      <textarea
        name="message"
        required
        rows={3}
        value={formData.message}
        onChange={handleChange}
        placeholder="Mensaje..."
        className={styles.textarea}
      />

      <button
        type="submit"
        disabled={loading}
        className={styles.submitBtn}
      >
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          <Send size={14} />
        )}
        <span>{loading ? "Enviando..." : "Enviar Mensaje"}</span>
      </button>
    </form>
  );
}

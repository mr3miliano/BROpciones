"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import styles from "./PropertyContactActions.module.css";

interface PropertyContactActionsProps {
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  agentName?: string;
  agentPhone?: string;
}

export default function PropertyContactActions({
  propertyId,
  propertyTitle,
  propertyLocation,
  agentName,
  agentPhone,
}: PropertyContactActionsProps) {
  const [loading, setLoading] = useState(false);
  const defaultPhone = "525512345678";
  const contactPhone = agentPhone || defaultPhone;

  const handleContact = async (method: "whatsapp" | "call") => {
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Prospecto (${method === "whatsapp" ? "WhatsApp" : "Llamada"})`,
          email: "contacto.directo@inmueble.com",
          phone: `No registrado`,
          message: `El cliente hizo clic para contactar por ${method} desde la propiedad "${propertyTitle}" (ID: ${propertyId}).`,
          propertyId: propertyId,
          method: method,
        }),
      });
    } catch (error) {
      console.error("Error al registrar click en CRM:", error);
    } finally {
      setLoading(false);
    }

    if (method === "whatsapp") {
      const text = encodeURIComponent(
        `Hola ${agentName || "Aura Hábitat"}, me interesa recibir información y agendar una cita para la propiedad "${propertyTitle}" (ID: ${propertyId}) ubicada en ${propertyLocation}.`
      );
      window.open(`https://wa.me/${contactPhone}?text=${text}`, "_blank");
    } else {
      window.location.href = `tel:+${contactPhone}`;
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleContact("whatsapp")}
        disabled={loading}
        className={styles.whatsappBtn}
      >
        <MessageCircle size={20} fill="#fff" />
        <span>Contactar por WhatsApp</span>
      </button>

      <button
        onClick={() => handleContact("call")}
        disabled={loading}
        className={styles.callBtn}
      >
        <Phone size={20} className={styles.callIcon} />
        <span>Llamar al Asesor</span>
      </button>

      <p className={styles.disclaimer}>
        Al hacer clic en contactar, autorizas el registro de la solicitud para que un asesor le dé seguimiento inmediato.
      </p>
    </div>
  );
}

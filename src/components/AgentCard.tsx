import { Phone, Mail, MessageCircle } from "lucide-react";
import styles from "./AgentCard.module.css";

interface AgentCardProps {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export default function AgentCard({ name, phone, email, avatar }: AgentCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <img
          src={avatar || "/images/default-avatar.png"}
          alt={name}
          className={styles.avatar}
        />
        <div className={styles.statusDot} />
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Tu Asesor Inmobiliario</span>
        <h4 className={styles.name}>{name}</h4>
        <div className={styles.contactLinks}>
          <a href={`tel:+${phone}`} className={styles.contactItem}>
            <Phone size={14} />
            <span>{phone}</span>
          </a>
          <a href={`mailto:${email}`} className={styles.contactItem}>
            <Mail size={14} />
            <span>{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

import styles from "./GlobalBackground.module.css";

export default function GlobalBackground({ images }: { images: any[] }) {
  if (!images || images.length === 0) {
    return <div className={styles.container} />;
  }

  return (
    <div className={styles.container}>
      {images.map((img, i) => (
        <div
          key={`bg-${i}`}
          className={styles.image}
          style={{
            animationDelay: `${i * 8}s`,
          }}
        >
          <img
            src={img}
            alt={`Fondo ${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
          />
        </div>
      ))}
      <div className={styles.overlay} />
    </div>
  );
}

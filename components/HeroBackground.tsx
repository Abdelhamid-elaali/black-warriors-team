'use client';

import styles from './Hero.module.css';

export default function HeroBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.heroWrapper}>
      {/* Tactical grid with intersection dots */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Ambient bottom glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Diagonal light streaks */}
      <div className={styles.diagonals} aria-hidden="true">
        <div className={styles.diag} />
        <div className={styles.diag} />
        <div className={styles.diag} />
      </div>

      {/* Animated scan line */}
      <div className={styles.scanLine} aria-hidden="true" />

      {/* HUD top / bottom bars */}
      <div className={styles.hudTop}  aria-hidden="true" />
      <div className={styles.hudBottom} aria-hidden="true" />

      {/* Vignette overlay */}
      <div className={styles.vignette} aria-hidden="true" />

      {/* Corner bracket accents */}
      <div className={styles.corners} aria-hidden="true">
        <span className={`${styles.corner} ${styles.cornerTL}`} />
        <span className={`${styles.corner} ${styles.cornerTR}`} />
        <span className={`${styles.corner} ${styles.cornerBL}`} />
        <span className={`${styles.corner} ${styles.cornerBR}`} />
      </div>

      {/* Page content sits above all layers */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

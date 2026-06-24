"use client";

import styles from "./Hero3DFloats.module.css";

const FLOATS = [
  { emoji: "🏠", label: "Verified PGs", delay: "0s", pos: "card1" },
  { emoji: "🍽️", label: "Mess & Tiffin", delay: "0.4s", pos: "card2" },
  { emoji: "🤝", label: "Roommates", delay: "0.8s", pos: "card3" },
];

export default function Hero3DFloats() {
  return (
    <div className={styles.container} aria-hidden="true">
      {FLOATS.map((item) => (
        <div
          key={item.label}
          className={`${styles.floatCard} ${styles[item.pos]}`}
          style={{ animationDelay: item.delay }}
        >
          <span className={styles.emoji}>{item.emoji}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
      <div className={styles.phoneFrame}>
        <div className={styles.phoneScreen}>
          <div className={styles.phoneHeader}>Campus Era</div>
          <div className={styles.phoneLine} />
          <div className={styles.phoneLineShort} />
          <div className={styles.phoneCard} />
          <div className={styles.phoneCard} />
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Disable scrolling when splash screen is active
    document.body.style.overflow = "hidden";

    // Start exit animation after 1.8s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1800);

    // Unmount component completely after 2.4s (exit animation takes 0.6s)
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2400);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || !show) return null;

  return (
    <div className={`${styles.overlay} ${isExiting ? styles.fadeOut : ""}`}>
      {/* Dynamic background floating particles for premium feel */}
      <div className={styles.particleContainer}>
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
      </div>

      <div className={`${styles.circle} ${isExiting ? styles.exit : ""}`}>
        <div className={styles.pulseRing} />
        <div className={styles.content}>
          <h1 className={styles.title}>Campus Era</h1>
          <div className={styles.separator} />
          <p className={styles.subtitle}>STUDENT HOUSING</p>
          <p className={styles.tagline}>Finally Sorted.</p>
        </div>
      </div>
    </div>
  );
}

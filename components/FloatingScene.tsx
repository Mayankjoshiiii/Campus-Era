"use client";

import { useEffect, useRef } from "react";
import styles from "./FloatingScene.module.css";

export default function FloatingScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      scene.style.setProperty("--mx", `${x * 18}px`);
      scene.style.setProperty("--my", `${y * 14}px`);
      scene.style.setProperty("--rx", `${y * -6}deg`);
      scene.style.setProperty("--ry", `${x * 8}deg`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} aria-hidden="true">
      <div className={styles.orbit}>
        <div className={`${styles.shape} ${styles.cube}`} />
        <div className={`${styles.shape} ${styles.ring}`} />
        <div className={`${styles.shape} ${styles.sphere}`} />
        <div className={`${styles.shape} ${styles.pyramid}`} />
        <div className={`${styles.shape} ${styles.cube2}`} />
        <div className={`${styles.shape} ${styles.sphere2}`} />
        <div className={`${styles.shape} ${styles.cone}`} />
        <div className={`${styles.shape} ${styles.cylinder}`} />
      </div>
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      <div className={styles.glow3} />
      <div className={styles.grid} />
    </div>
  );
}

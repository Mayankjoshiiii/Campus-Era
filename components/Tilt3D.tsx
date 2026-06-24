"use client";

import type { ReactNode, CSSProperties } from "react";
import { use3DTilt } from "@/hooks/use3DTilt";
import styles from "./Tilt3D.module.css";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  style?: CSSProperties;
};

export default function Tilt3D({
  children,
  className = "",
  maxTilt = 14,
  scale = 1.03,
  glare = true,
  style,
}: Tilt3DProps) {
  const tilt = use3DTilt(maxTilt, scale);

  return (
    <div
      ref={tilt.ref}
      className={`${styles.wrapper} ${className}`}
      style={style}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
    >
      <div className={styles.inner} style={{ transform: tilt.transform }}>
        {glare && (
          <div
            className={styles.glare}
            style={{
              opacity: tilt.glare.opacity,
              background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.35) 0%, transparent 55%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

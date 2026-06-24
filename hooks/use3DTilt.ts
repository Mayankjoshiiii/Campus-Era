"use client";

import { useRef, useCallback, useState, type MouseEvent } from "react";

type GlareState = { x: number; y: number; opacity: number };

export function use3DTilt(maxTilt = 14, scale = 1.03) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [glare, setGlare] = useState<GlareState>({ x: 50, y: 50, opacity: 0 });

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;

      setTransform(
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
      setGlare({ x: x * 100, y: y * 100, opacity: 0.18 });
    },
    [maxTilt, scale]
  );

  const onLeave = useCallback(() => {
    setTransform(
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return { ref, transform, glare, onMove, onLeave };
}

"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/**
 * Цифра, которая досчитывается один раз при появлении в зоне видимости
 * (CLAUDE.md, раздел 6). Уважает prefers-reduced-motion — тогда значение
 * просто появляется сразу.
 */
export function CountUpNumber({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [display, setDisplay] = useState(() => (prefersReducedMotion ? value : 0));

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, value, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

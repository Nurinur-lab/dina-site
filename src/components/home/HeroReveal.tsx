"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Единая оркестрованная сцена загрузки hero (CLAUDE.md, раздел 6):
 * проявление фото → въезд слова-«призрака» и заголовка → прорисовка полосы.
 * Укладывается в 1,2 с. При prefers-reduced-motion всё появляется сразу.
 */
export function HeroReveal({
  photo,
  ghost,
  content,
  stripe,
}: {
  photo: ReactNode;
  ghost: ReactNode;
  content: ReactNode;
  stripe: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-dvh min-h-[560px] flex-col">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {photo}
        <div className="from-night/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: reduceMotion ? 0 : 0.15 }}
        className="pointer-events-none absolute inset-0"
      >
        {ghost}
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.35 }}
        className="relative mt-auto flex flex-col gap-6 px-5 pb-16 md:px-10 md:pb-20"
      >
        {content}
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: reduceMotion ? 0 : 0.8 }}
        style={{ transformOrigin: "left" }}
        className="relative"
      >
        {stripe}
      </motion.div>
    </div>
  );
}

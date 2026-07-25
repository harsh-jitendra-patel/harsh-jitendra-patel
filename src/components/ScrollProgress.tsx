"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-accent via-accent-emerald to-accent-blue origin-left shadow-[0_0_12px_rgba(6,182,212,0.8)] pointer-events-none"
    />
  );
}

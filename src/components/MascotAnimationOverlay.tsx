"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, MascotType } from "@/components/ThemeContext";
import { Sparkles, Flame, Feather, ShieldAlert } from "lucide-react";

const MASCOT_CONFIGS: Record<
  MascotType,
  {
    title: string;
    subtitle: string;
    gradient: string;
    borderColor: string;
    particleColor: string;
  }
> = {
  lion: {
    title: "GRYFFINDOR",
    subtitle: "Courage & Valor Awakened!",
    gradient: "from-red-600 via-amber-500 to-yellow-300",
    borderColor: "border-amber-400",
    particleColor: "#f59e0b",
  },
  badger: {
    title: "HUFFLEPUFF",
    subtitle: "Dedication & Loyalty Unleashed!",
    gradient: "from-amber-400 via-yellow-300 to-zinc-900",
    borderColor: "border-yellow-400",
    particleColor: "#facc15",
  },
  eagle: {
    title: "RAVENCLAW",
    subtitle: "Wisdom & Ingenuity Unlocked!",
    gradient: "from-sky-400 via-blue-600 to-indigo-900",
    borderColor: "border-sky-300",
    particleColor: "#38bdf8",
  },
  snake: {
    title: "SLYTHERIN",
    subtitle: "Ambition & Resourcefulness Awakened!",
    gradient: "from-emerald-400 via-teal-600 to-zinc-950",
    borderColor: "border-emerald-400",
    particleColor: "#34d399",
  },
};

export default function MascotAnimationOverlay() {
  const { animatingMascot, clearMascot } = useTheme();

  useEffect(() => {
    if (animatingMascot) {
      const timer = setTimeout(() => {
        clearMascot();
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [animatingMascot, clearMascot]);

  if (!animatingMascot) return null;

  const config = MASCOT_CONFIGS[animatingMascot];

  return (
    <AnimatePresence>
      <motion.div
        key={animatingMascot}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center backdrop-blur-[2px] bg-black/20"
      >
        {/* Animated Flash Radial Burst */}
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`absolute w-96 h-96 rounded-full bg-gradient-to-r ${config.gradient} blur-3xl opacity-30`}
        />

        {/* Center Spell Burst Text Banner */}
        <motion.div
          initial={{ scale: 0.4, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="relative text-center z-10 px-8 py-5 rounded-2xl bg-zinc-950/85 border-2 border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.5)] backdrop-blur-md max-w-sm sm:max-w-md mx-4"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles size={16} className="text-amber-400 animate-spin" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90 font-bold">
              House Trigger Activated
            </span>
            <Sparkles size={16} className="text-amber-400 animate-spin" />
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black font-serif tracking-widest bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent drop-shadow-md`}>
            {config.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-amber-100 italic mt-1">
            &ldquo;{config.subtitle}&rdquo;
          </p>
        </motion.div>

        {/* Mascot Creature Motion Path Animation */}
        {animatingMascot === "lion" && (
          <motion.div
            initial={{ x: "-20vw", y: "30vh", scale: 0.6, rotate: -10 }}
            animate={{
              x: ["-20vw", "40vw", "120vw"],
              y: ["30vh", "15vh", "25vh"],
              scale: [0.6, 1.2, 0.8],
              rotate: [-10, 5, 15],
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 text-amber-400 drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] flex items-center gap-2"
          >
            {/* Leaping Lion SVG Silhouette */}
            <svg width="140" height="100" viewBox="0 0 120 90" fill="currentColor">
              {/* Lion Rampant Silhouette */}
              <path d="M 40 70 C 25 65 30 45 42 40 C 50 35 60 42 68 50 C 64 60 50 72 40 70 Z" fill="#ef4444" />
              <path d="M 68 50 C 78 35 95 30 110 40 C 118 45 112 55 102 52 C 92 50 82 55 78 65 Z" fill="#f59e0b" />
              <circle cx="108" cy="38" r="4" fill="#fef08a" />
              <path d="M 110 40 L 118 36 L 114 44 Z" fill="#ef4444" />
              <path d="M 55 45 L 75 25 L 82 32 Z" fill="#f59e0b" />
              <path d="M 62 48 L 88 30 L 92 36 Z" fill="#fef08a" />
              <path d="M 30 68 C 15 70 10 82 16 88 C 22 86 26 78 34 72 Z" fill="#ef4444" />
            </svg>
            <div className="flex flex-col text-red-500 animate-pulse">
              <Flame size={28} />
              <Sparkles size={20} />
            </div>
          </motion.div>
        )}

        {animatingMascot === "badger" && (
          <motion.div
            initial={{ x: "-20vw", y: "55vh", scale: 0.7 }}
            animate={{
              x: ["-20vw", "45vw", "120vw"],
              y: ["55vh", "50vh", "58vh"],
              scale: [0.7, 1.1, 0.9],
              rotate: [0, -5, 5],
            }}
            transition={{ duration: 2.1, ease: "easeInOut" }}
            className="absolute top-0 left-0 text-yellow-400 drop-shadow-[0_0_25px_rgba(234,179,8,0.9)] flex items-center gap-2"
          >
            {/* Scurrying Badger SVG */}
            <svg width="130" height="90" viewBox="0 0 120 80" fill="currentColor">
              <path d="M 85 45 C 95 40 108 42 105 52 C 98 58 88 54 80 50 Z" fill="#e2e8f0" />
              <path d="M 88 42 L 102 46 L 98 50 Z" fill="#18181b" />
              <path d="M 45 60 C 35 55 40 40 55 36 C 65 34 75 42 82 48 C 76 58 60 64 45 60 Z" fill="#713f12" />
              <path d="M 52 42 L 40 28 L 32 34 Z" fill="#facc15" />
              <path d="M 60 48 L 52 32 L 46 38 Z" fill="#facc15" />
              <path d="M 38 58 C 26 60 20 72 26 76 C 30 74 34 66 40 60 Z" fill="#713f12" />
            </svg>
            <div className="flex flex-col text-amber-300">
              <Sparkles size={24} className="animate-spin" />
              <Sparkles size={16} />
            </div>
          </motion.div>
        )}

        {animatingMascot === "eagle" && (
          <motion.div
            initial={{ x: "-20vw", y: "15vh", scale: 0.6, rotate: 15 }}
            animate={{
              x: ["-20vw", "40vw", "120vw"],
              y: ["15vh", "40vh", "10vh"],
              scale: [0.6, 1.3, 0.7],
              rotate: [15, -10, -25],
            }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute top-0 left-0 text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.9)] flex items-center gap-2"
          >
            {/* Soaring Eagle/Raven SVG */}
            <svg width="150" height="110" viewBox="0 0 140 100" fill="currentColor">
              <path d="M 70 50 C 50 20 20 30 30 65 C 45 68 62 58 70 50 Z" fill="#0284c7" />
              <path d="M 70 50 C 90 20 120 30 110 65 C 95 68 78 58 70 50 Z" fill="#0284c7" />
              <path d="M 70 38 C 76 30 86 34 82 42 C 78 46 68 44 66 40 Z" fill="#e0f2fe" />
              <path d="M 82 36 L 92 40 L 82 44 Z" fill="#f59e0b" />
              <path d="M 64 48 C 62 65 68 85 70 95 C 72 85 78 65 76 48 Z" fill="#0369a1" />
            </svg>
            <div className="flex flex-col text-sky-300">
              <Feather size={26} className="animate-bounce" />
              <Sparkles size={18} />
            </div>
          </motion.div>
        )}

        {animatingMascot === "snake" && (
          <motion.div
            initial={{ x: "-20vw", y: "45vh", scale: 0.7 }}
            animate={{
              x: ["-20vw", "40vw", "120vw"],
              y: ["45vh", "25vh", "50vh"],
              scale: [0.7, 1.2, 0.8],
              rotate: [0, -15, 10],
            }}
            transition={{ duration: 2.1, ease: "easeInOut" }}
            className="absolute top-0 left-0 text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.95)] flex items-center gap-2"
          >
            {/* Slithering Snake SVG */}
            <svg width="160" height="90" viewBox="0 0 150 80" fill="none" stroke="currentColor">
              <path
                d="M 10 40 Q 30 10 50 40 T 90 40 T 130 40"
                stroke="#10b981"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 10 40 Q 30 10 50 40 T 90 40 T 130 40"
                stroke="#a7f3d0"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path d="M 130 40 C 140 32 146 48 138 52 Z" fill="#a7f3d0" stroke="#064e3b" strokeWidth="2" />
              <circle cx="138" cy="42" r="2" fill="#ef4444" />
              <path d="M 142 44 L 150 40 M 142 44 L 150 48" stroke="#ef4444" strokeWidth="2" />
            </svg>
            <div className="flex flex-col text-emerald-300">
              <Sparkles size={24} className="animate-spin" />
              <ShieldAlert size={20} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

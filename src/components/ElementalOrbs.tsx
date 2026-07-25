"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, House } from "@/components/ThemeContext";
import { Flame, Sprout, Droplets, Wind, Sparkles } from "lucide-react";

interface Orb {
  id: string;
  element: "fire" | "earth" | "water" | "air";
  house: House;
  title: string;
  x: number; // percentage of screen width (10 - 85)
  y: number; // percentage of screen height / section height (10 - 85)
  icon: typeof Flame;
  gradient: string;
  glow: string;
  particleColor: string;
}

const ELEMENTAL_ORBS: Omit<Orb, "x" | "y">[] = [
  {
    id: "fire-orb",
    element: "fire",
    house: "gryffindor",
    title: "Elemental Fire (Gryffindor)",
    icon: Flame,
    gradient: "from-red-600 via-amber-500 to-yellow-400 text-yellow-200",
    glow: "shadow-[0_0_25px_rgba(239,68,68,0.85)] border-amber-400/70",
    particleColor: "#ef4444",
  },
  {
    id: "earth-orb",
    element: "earth",
    house: "hufflepuff",
    title: "Elemental Earth (Hufflepuff)",
    icon: Sprout,
    gradient: "from-amber-500 via-yellow-400 to-amber-700 text-yellow-100",
    glow: "shadow-[0_0_25px_rgba(234,179,8,0.85)] border-yellow-300/70",
    particleColor: "#facc15",
  },
  {
    id: "water-orb",
    element: "water",
    house: "ravenclaw",
    title: "Elemental Water (Ravenclaw)",
    icon: Droplets,
    gradient: "from-sky-500 via-blue-600 to-indigo-600 text-sky-100",
    glow: "shadow-[0_0_25px_rgba(56,189,248,0.85)] border-sky-300/70",
    particleColor: "#38bdf8",
  },
  {
    id: "air-orb",
    element: "air",
    house: "slytherin",
    title: "Elemental Air (Slytherin)",
    icon: Wind,
    gradient: "from-emerald-400 via-teal-600 to-zinc-800 text-emerald-100",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.85)] border-emerald-300/70",
    particleColor: "#34d399",
  },
];

export default function ElementalOrbs() {
  const { elementsInitiated, setHouse } = useTheme();
  const [orbs, setOrbs] = useState<Orb[]>([]);

  // Randomize locations on mount and periodically drift them
  useEffect(() => {
    if (!elementsInitiated) return;

    const randomizePositions = () => {
      const positions: { x: number; y: number }[] = [
        { x: 12, y: 22 },
        { x: 82, y: 35 },
        { x: 18, y: 72 },
        { x: 78, y: 80 },
      ];

      // Shuffle initial offsets randomly
      const randomized = ELEMENTAL_ORBS.map((orbBase, i) => {
        const pos = positions[i];
        return {
          ...orbBase,
          x: Math.max(8, Math.min(88, pos.x + (Math.random() * 12 - 6))),
          y: Math.max(10, Math.min(88, pos.y + (Math.random() * 12 - 6))),
        };
      });

      setOrbs(randomized);
    };

    randomizePositions();

    // Periodically relocate slightly every 12 seconds to keep screen dynamic
    const interval = setInterval(() => {
      setOrbs((prevOrbs) =>
        prevOrbs.map((orb) => ({
          ...orb,
          x: Math.max(8, Math.min(88, orb.x + (Math.random() * 16 - 8))),
          y: Math.max(12, Math.min(85, orb.y + (Math.random() * 16 - 8))),
        }))
      );
    }, 12000);

    return () => clearInterval(interval);
  }, [elementsInitiated]);

  if (!elementsInitiated) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {orbs.map((orb) => {
          const IconComponent = orb.icon;

          return (
            <motion.div
              key={orb.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.75, 1, 0.75],
                scale: [1, 1.12, 1],
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                y: [0, -12, 0],
              }}
              transition={{
                left: { duration: 3, ease: "easeInOut" },
                top: { duration: 3, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute pointer-events-auto cursor-pointer group"
              onClick={() => setHouse(orb.house, true)}
              title={`${orb.title} - Click to summon ${orb.house.toUpperCase()}!`}
            >
              {/* Outer Elemental Glow Ring */}
              <div className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br ${orb.gradient} border-2 ${orb.glow} backdrop-blur-md flex items-center justify-center p-2 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}>
                
                {/* Rotating Sparkle Ring */}
                <div className="absolute -inset-1 rounded-full border border-white/30 group-hover:border-white/70 animate-spin pointer-events-none" />

                {/* Element Icon */}
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md group-hover:animate-pulse" />

                {/* Micro Sparkle Indicator */}
                <Sparkles size={10} className="absolute -top-1 -right-1 text-white animate-bounce" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";
import { Sparkles, Flame, ShieldAlert, Feather, Award } from "lucide-react";

/**
 * Secret Gryffindor Easter Egg Trigger
 * Subtle flickering flame rune embedded discreetly in the Hero/Header section.
 */
export function GryffindorTrigger({ className = "" }: { className?: string }) {
  const { setHouse } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.35, rotate: 12 }}
      whileTap={{ scale: 0.85 }}
      onClick={() => setHouse("gryffindor", true)}
      className={`group relative p-1.5 rounded-full text-red-500/80 hover:text-amber-300 bg-red-950/20 hover:bg-red-950/60 border border-red-500/20 hover:border-amber-400/80 shadow-none hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] backdrop-blur-sm cursor-pointer transition-all duration-300 opacity-60 hover:opacity-100 ${className}`}
      title="✨ A secret flame flickers..."
      aria-label="Hidden Gryffindor Easter Egg"
    >
      <div className="relative flex items-center justify-center">
        <Flame size={14} className="animate-pulse" />
        <Sparkles size={8} className="absolute -top-1 -right-1 text-amber-300 opacity-0 group-hover:opacity-100 animate-spin transition-opacity" />
      </div>
    </motion.button>
  );
}

/**
 * Secret Hufflepuff Easter Egg Trigger
 * Subtle badger chalice rune embedded discreetly in the Footer.
 */
export function HufflepuffTrigger({ className = "" }: { className?: string }) {
  const { setHouse } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.35, rotate: -12 }}
      whileTap={{ scale: 0.85 }}
      onClick={() => setHouse("hufflepuff", true)}
      className={`group relative p-1.5 rounded-full text-yellow-400/80 hover:text-amber-200 bg-amber-950/20 hover:bg-amber-950/60 border border-yellow-500/20 hover:border-yellow-400/80 shadow-none hover:shadow-[0_0_15px_rgba(234,179,8,0.6)] backdrop-blur-sm cursor-pointer transition-all duration-300 opacity-60 hover:opacity-100 ${className}`}
      title="✨ An ancient badger crest rests here..."
      aria-label="Hidden Hufflepuff Easter Egg"
    >
      <div className="relative flex items-center justify-center">
        <Award size={14} className="group-hover:rotate-12 transition-transform" />
        <Sparkles size={8} className="absolute -top-1 -right-1 text-yellow-300 opacity-0 group-hover:opacity-100 animate-spin transition-opacity" />
      </div>
    </motion.button>
  );
}

/**
 * Secret Ravenclaw Easter Egg Trigger
 * Subtle diadem feather rune embedded discreetly in the Architecture Sandbox or Projects.
 */
export function RavenclawTrigger({ className = "" }: { className?: string }) {
  const { setHouse } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.35, rotate: 12 }}
      whileTap={{ scale: 0.85 }}
      onClick={() => setHouse("ravenclaw", true)}
      className={`group relative p-1.5 rounded-full text-sky-400/80 hover:text-sky-200 bg-sky-950/20 hover:bg-sky-950/60 border border-sky-400/20 hover:border-sky-300/80 shadow-none hover:shadow-[0_0_15px_rgba(56,189,248,0.6)] backdrop-blur-sm cursor-pointer transition-all duration-300 opacity-60 hover:opacity-100 ${className}`}
      title="✨ A forgotten diadem glows softly..."
      aria-label="Hidden Ravenclaw Easter Egg"
    >
      <div className="relative flex items-center justify-center">
        <Feather size={14} className="group-hover:animate-bounce" />
        <Sparkles size={8} className="absolute -top-1 -right-1 text-sky-200 opacity-0 group-hover:opacity-100 animate-spin transition-opacity" />
      </div>
    </motion.button>
  );
}

/**
 * Secret Slytherin Easter Egg Trigger
 * Subtle serpent scale rune embedded discreetly in the Contact section.
 */
export function SlytherinTrigger({ className = "" }: { className?: string }) {
  const { setHouse } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.35, rotate: -12 }}
      whileTap={{ scale: 0.85 }}
      onClick={() => setHouse("slytherin", true)}
      className={`group relative p-1.5 rounded-full text-emerald-400/80 hover:text-emerald-200 bg-emerald-950/20 hover:bg-emerald-950/60 border border-emerald-400/20 hover:border-emerald-300/80 shadow-none hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] backdrop-blur-sm cursor-pointer transition-all duration-300 opacity-60 hover:opacity-100 ${className}`}
      title="✨ A serpent scale shimmers in shadow..."
      aria-label="Hidden Slytherin Easter Egg"
    >
      <div className="relative flex items-center justify-center">
        <ShieldAlert size={14} className="group-hover:rotate-12 transition-transform" />
        <Sparkles size={8} className="absolute -top-1 -right-1 text-emerald-200 opacity-0 group-hover:opacity-100 animate-spin transition-opacity" />
      </div>
    </motion.button>
  );
}

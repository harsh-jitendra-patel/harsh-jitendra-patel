"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, House, HOUSES } from "@/components/ThemeContext";
import { Sparkles, RefreshCw, Flame, Award, Feather, ShieldAlert } from "lucide-react";
import HouseCrest from "@/components/HouseCrest";

const HOUSE_FACTS: Record<House, { title: string; subtitle: string; facts: string[]; borderColor: string; gradient: string }> = {
  gryffindor: {
    title: "GRYFFINDOR",
    subtitle: "YES, I'M A GRYFFINDOR",
    borderColor: "border-amber-400/80 shadow-[0_0_35px_rgba(239,68,68,0.45)]",
    gradient: "from-red-950/95 via-zinc-950 to-amber-900/90 text-amber-300",
    facts: [
      "Gryffindors are renowned for daring courage—just like how I fearlessly led legacy monolithic overhauls into cloud microservices!",
      "Chivalry & Bravery: I tackle high-stakes enterprise projects under tight deadlines with 100% resolution confidence.",
      "Gryffindors stand tall in battle: I maintain bulletproof system resilience across high-concurrency .NET Core architectures.",
      "Daring, nerve, and chivalry set Gryffindors apart: I pioneered AI-assisted automated asset management workflows.",
      "Gryffindor leadership inspires teams: I have mentored developers and driven modern CI/CD practices across engineering teams.",
      "Bold innovation over comfort: I cut system latency by 75% through decoupled event-driven queues & Redis caching.",
    ],
  },
  hufflepuff: {
    title: "HUFFLEPUFF",
    subtitle: "YES, I'M A HUFFLEPUFF",
    borderColor: "border-yellow-400/80 shadow-[0_0_35px_rgba(234,179,8,0.45)]",
    gradient: "from-amber-950/95 via-zinc-950 to-yellow-900/90 text-yellow-300",
    facts: [
      "Hufflepuffs are famous for unyielding dedication—just like my 9+ years architecting scalable enterprise systems!",
      "Hufflepuff values hard work over boasting: I cut API response latency by 75% using decoupled Azure queues & Redis caching.",
      "Hufflepuff produces the fewest Dark wizards (and fewest production bugs): I maintain clean architecture across .NET Core & Angular.",
      "Loyalty is a Hufflepuff core trait: I have spent nearly a decade leading teams and delivering 100% on-time releases.",
      "The Hufflepuff badger never backs down from a complex challenge—like how I modernized legacy monolithic setups into cloud microservices!",
      "Patience, practice, and perseverance: I have mastered AI workflows, DAM digital asset management, and high-concurrency systems.",
    ],
  },
  ravenclaw: {
    title: "RAVENCLAW",
    subtitle: "YES, I'M A RAVENCLAW",
    borderColor: "border-sky-400/80 shadow-[0_0_35px_rgba(56,189,248,0.45)]",
    gradient: "from-sky-950/95 via-zinc-950 to-indigo-900/90 text-sky-300",
    facts: [
      "Ravenclaws value wisdom, intellect, and ingenuity—just like my analytical approach to cloud enterprise architecture!",
      "Clever engineering & sharp logic: I design decoupled event-driven systems that seamlessly handle millions of requests.",
      "Wit beyond measure is man's greatest treasure: I continuously master cutting-edge AI, Angular, and .NET Core technologies.",
      "Ravenclaws excel at complex problem solving: I eliminated bottleneck queries and optimized SQL performance by 60%.",
      "Curiosity and technical mastery: I built real-time interactive 3D sandboxes and cloud architecture visualizers.",
      "Analytical precision in every build: Clean code principles, strict microservice boundaries, and automated testing suites.",
    ],
  },
  slytherin: {
    title: "SLYTHERIN",
    subtitle: "YES, I'M A SLYTHERIN",
    borderColor: "border-emerald-400/80 shadow-[0_0_35px_rgba(16,185,129,0.45)]",
    gradient: "from-emerald-950/95 via-zinc-950 to-teal-900/90 text-emerald-300",
    facts: [
      "Slytherins are driven by ambition and strategic resourcefulness—just like my track record of optimizing enterprise ROI!",
      "Strategic mastermind: I transformed legacy setups into high-performance microservices, driving maximum efficiency.",
      "Resourcefulness at its finest: I leveraged Redis caching & asynchronous message brokers to optimize infrastructure cost.",
      "Slytherin ambition achieves great heights: 9+ years leading enterprise systems from concept to full-scale deployment.",
      "Calculated precision under pressure: I architected fault-tolerant systems with 99.99% uptime guarantees.",
      "Greatness requires vision: Harnessing AI capabilities and modern full-stack architectures to dominate complex domains.",
    ],
  },
};

export default function HogwartsHouseSeal() {
  const { house, isHouseTheme, cycleHouse, setHouse } = useTheme();
  const [factIndex, setFactIndex] = useState(0);

  if (!isHouseTheme) return null;

  const currentConfig = HOUSE_FACTS[house] || HOUSE_FACTS.hufflepuff;
  const houseIndex = HOUSES.indexOf(house) + 1;

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % currentConfig.facts.length);
  };

  return (
    <AnimatePresence>
      {isHouseTheme && (
        <motion.div
          key={`house-seal-${house}`}
          initial={{ opacity: 0, scale: 2.2, rotate: -25, y: -60 }}
          animate={{ opacity: 1, scale: 1, rotate: -4, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
          whileTap={{ scale: 0.95, rotate: -6 }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 20,
            mass: 1.1,
          }}
          className="fixed bottom-6 right-6 z-40 cursor-pointer group"
          onClick={nextFact}
        >
          {/* Outer Seal Container */}
          <div className={`relative w-[285px] h-[285px] sm:w-[325px] sm:h-[325px] aspect-square rounded-full border-4 border-dashed bg-gradient-to-br ${currentConfig.borderColor} ${currentConfig.gradient} backdrop-blur-md flex flex-col items-center justify-center text-center p-5 select-none transform hover:rotate-0 hover:scale-105 transition-all duration-300 overflow-hidden`}>
            
            {/* Inner Ring */}
            <div className="absolute inset-2.5 rounded-full border border-amber-400/30 pointer-events-none" />

            {/* Top Seal Header */}
            <div className="flex items-center gap-1 text-[9px] font-mono font-extrabold uppercase tracking-widest opacity-90">
              <Sparkles size={9} className="animate-spin" />
              <span>{currentConfig.title} SEAL ({houseIndex}/4)</span>
              <Sparkles size={9} className="animate-spin" />
            </div>

            {/* Center Subtitle */}
            <h3 className="text-xs sm:text-sm font-black font-serif tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] leading-tight my-0.5">
              {currentConfig.subtitle}
            </h3>

            {/* Heraldic Crest */}
            <div className="my-0.5 flex items-center justify-center shrink-0">
              <HouseCrest house={house} size={62} />
            </div>

            {/* Dynamic Sayings Box */}
            <div className="h-[60px] sm:h-[68px] flex items-center justify-center px-3 max-w-[245px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${house}-${factIndex}`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="text-[9px] sm:text-[10px] font-mono text-zinc-100 leading-snug italic text-center"
                >
                  &ldquo;{currentConfig.facts[factIndex % currentConfig.facts.length]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Controls Bar */}
            <div className="mt-1 flex items-center gap-2 text-[8px] font-mono uppercase font-bold tracking-wider z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cycleHouse(true);
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 hover:bg-amber-400/40 transition-colors text-amber-200 cursor-pointer"
                title="Cycle to Next Hogwarts House"
              >
                <RefreshCw size={8} className="group-hover:rotate-180 transition-transform duration-500" />
                <span>Cycle House</span>
              </button>

              {/* Quick Mascot Selector Icons */}
              <div className="flex items-center gap-1 text-zinc-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHouse("gryffindor", true);
                  }}
                  className={`p-0.5 rounded hover:text-red-400 ${house === "gryffindor" ? "text-red-400 font-extrabold" : ""}`}
                  title="Switch to Gryffindor"
                >
                  <Flame size={9} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHouse("hufflepuff", true);
                  }}
                  className={`p-0.5 rounded hover:text-yellow-400 ${house === "hufflepuff" ? "text-yellow-400 font-extrabold" : ""}`}
                  title="Switch to Hufflepuff"
                >
                  <Award size={9} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHouse("ravenclaw", true);
                  }}
                  className={`p-0.5 rounded hover:text-sky-400 ${house === "ravenclaw" ? "text-sky-400 font-extrabold" : ""}`}
                  title="Switch to Ravenclaw"
                >
                  <Feather size={9} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHouse("slytherin", true);
                  }}
                  className={`p-0.5 rounded hover:text-emerald-400 ${house === "slytherin" ? "text-emerald-400 font-extrabold" : ""}`}
                  title="Switch to Slytherin"
                >
                  <ShieldAlert size={9} />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

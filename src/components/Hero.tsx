"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, ExternalLink, ShieldCheck, Cpu, Cloud, Code, GraduationCap, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useTheme } from "@/components/ThemeContext";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import { GryffindorTrigger } from "@/components/EasterEggTriggers";
import clsx from "clsx";

export default function Hero() {
  const roles = [
    "Lead Software Engineer",
    "Full-Stack Architect",
    "Azure Cloud Systems Builder",
    "AI Workflow Innovator"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  const { theme } = useTheme();

  const attributes = [
    { text: "Certified Claude Architect", icon: Cpu },
    { text: "OIDC & Snyk Secure", icon: ShieldCheck },
    { text: "Azure Cloud Specialist", icon: Cloud },
    { text: "Full-Stack .NET & Angular Lead", icon: Code },
  ];
  const [attrIndex, setAttrIndex] = useState(0);

  // Cycling attributes timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAttrIndex((prev) => (prev + 1) % attributes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [attributes.length]);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === roles[roleIndex].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, roleIndex, roles]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = attributes[attrIndex].icon;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Interactive Network Nodes Canvas */}
      <BackgroundCanvas />

      {/* Radial overlay to make text highly readable */}
      <div className="absolute inset-0 bg-radial from-transparent via-background/70 to-background pointer-events-none" />

      {/* Grid overlay for digital engineering aesthetic */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-emerald/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pb-16">
        {/* Certification Pill Badge & Hidden Gryffindor Secret Trigger */}
        <div className="h-9 mb-6 flex items-center justify-center gap-2">
          <AnimatePresence mode="wait">
            {theme === "hogwarts" ? (
              <motion.div
                key="hogwarts-pill"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-xs font-mono font-bold text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
              >
                <GraduationCap size={14} className="text-amber-400 animate-bounce" />
                <span>Honorary Hogwarts Graduate</span>
                <Sparkles size={12} className="text-amber-400 animate-pulse" />
              </motion.div>
            ) : (
              <motion.div
                key={attributes[attrIndex].text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-xs font-mono font-semibold text-accent-emerald shadow-sm"
              >
                <CurrentIcon size={13} className="animate-pulse shrink-0" />
                <span>{attributes[attrIndex].text}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <GryffindorTrigger className="ml-1" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">
            {personalInfo.location}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-text-primary">{personalInfo.name.split(" ")[0]} </span>
            <span className="gradient-text">{personalInfo.name.split(" ")[1]}</span>
          </h1>
          
          {/* Animated terminal typewriter title */}
          <div className="text-xl md:text-2xl font-mono font-bold text-text-secondary mb-6 h-8 flex items-center justify-center">
            <span className="text-accent mr-2">&gt;</span>
            <span>{roles[roleIndex].substring(0, subIndex)}</span>
            <span className={clsx("inline-block w-2.5 h-6 bg-accent ml-1 transition-opacity", cursorBlink ? "opacity-100" : "opacity-0")} />
          </div>

          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            {personalInfo.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20"
        >
          <a
            href={personalInfo.resumePdf}
            download
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-all duration-200 glow-cyan w-full sm:w-auto justify-center"
          >
            <Download size={18} />
            Download Resume
          </a>
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl glass-light text-text-primary font-semibold text-sm hover:bg-surface-lighter/70 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <ExternalLink size={18} />
            Explore Projects
          </a>
        </motion.div>
      </div>

      {/* Centered Scroll Down Indicator Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#impact"
          className="flex flex-col items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors cursor-pointer group"
          aria-label="Scroll down to metrics"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
            Scroll Down
          </span>
          <div className="w-9 h-9 rounded-full glass-light flex items-center justify-center border border-border/40 group-hover:border-accent/50 group-hover:glow-cyan transition-all">
            <ArrowDown size={16} className="animate-bounce text-accent" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

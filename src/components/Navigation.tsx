"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Zap, Sparkles } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/components/ThemeContext";
import clsx from "clsx";

import { House } from "@/components/ThemeContext";

const HOUSE_LOGO_STYLES: Record<House, { logoClass: string; containerClass: string; textClass: string }> = {
  gryffindor: {
    logoClass: "text-red-500 drop-shadow-[0_0_14px_rgba(239,68,68,0.95)]",
    containerClass: "bg-red-950/40 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    textClass: "text-amber-300",
  },
  hufflepuff: {
    logoClass: "text-yellow-400 drop-shadow-[0_0_14px_rgba(234,179,8,0.95)]",
    containerClass: "bg-amber-950/40 border-yellow-400/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    textClass: "text-yellow-300",
  },
  ravenclaw: {
    logoClass: "text-sky-400 drop-shadow-[0_0_14px_rgba(56,189,248,0.95)]",
    containerClass: "bg-sky-950/40 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    textClass: "text-sky-200",
  },
  slytherin: {
    logoClass: "text-emerald-400 drop-shadow-[0_0_14px_rgba(16,185,129,0.95)]",
    containerClass: "bg-emerald-950/40 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    textClass: "text-emerald-200",
  },
};

const HarryPotterLogo = ({ size = 32, house, className = "" }: { size?: number; house?: House; className?: string }) => {
  const houseStyle = house ? HOUSE_LOGO_STYLES[house]?.logoClass : "text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={clsx(houseStyle, className)}
    >
      {/* Left H stem & serifs */}
      <path d="M 22 15 H 42 V 22 H 36 V 44 H 50 V 22 H 44 V 15 H 64 V 22 H 58 V 78 H 64 V 85 H 44 V 78 H 50 V 52 H 36 V 78 H 42 V 85 H 22 V 78 H 28 V 22 H 22 Z" />
      {/* Left wand extension */}
      <path d="M 28 44 L 10 36 L 28 48 Z" />
      {/* Diagonal cross-bar linking H to P */}
      <path d="M 52 46 L 75 28 L 75 35 L 52 53 Z" />
      {/* P loop and Lightning Bolt tail */}
      <path d="M 72 26 H 92 C 98 26, 102 32, 100 40 C 98 48, 90 52, 80 52 H 72 V 60 L 63 76 L 68 76 L 56 98 L 62 72 L 57 72 Z" />
    </svg>
  );
};

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    theme,
    house,
    isHouseTheme,
    revertToNormalMode,
    toggleLightDark,
    cycleHouse,
  } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHouseTheme) {
      // Exit House theme & revert back to normal mode
      revertToNormalMode();
    } else {
      // Secretly trigger default house if clicked in normal mode
      cycleHouse(true);
    }
  };

  const houseStyle = HOUSE_LOGO_STYLES[house] || HOUSE_LOGO_STYLES.hufflepuff;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-3" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Acts as Theme Exit Point when active */}
        <button
          onClick={handleLogoClick}
          className="group cursor-pointer flex items-center gap-2 focus:outline-none"
          title={
            isHouseTheme
              ? `Active House: ${house.toUpperCase()} — Click Harry Potter Logo to Exit Theme`
              : "Discover Secret Easter Eggs across the page to enter Hogwarts Houses!"
          }
        >
          {isHouseTheme ? (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-sm transition-all duration-300 ${houseStyle.containerClass}`}
            >
              <HarryPotterLogo size={28} house={house} className="animate-pulse" />
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${houseStyle.textClass}`}>
                {house}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold tracking-wider gradient-text font-[family-name:var(--font-jetbrains)] group-hover:scale-110 transition-transform">
              HP
            </span>
          )}
        </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-accent transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* House Cycle Button (if in House Mode) */}
            {isHouseTheme && (
              <button
                onClick={() => cycleHouse(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 hover:bg-amber-400/30 transition-colors cursor-pointer"
                title="Cycle through Hogwarts Houses"
              >
                <Sparkles size={13} className="animate-spin text-amber-400" />
                <span className="capitalize">Cycle ({house})</span>
              </button>
            )}

            {/* Light / Dark Mode Switch */}
            <button
              onClick={toggleLightDark}
              className="p-2 rounded-xl glass-light text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Toggle dark/light mode"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <Moon size={18} className="text-amber-500" /> : <Sun size={18} className="text-amber-400" />}
            </button>

            <a
              href="#contact"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {isHouseTheme && (
              <button
                onClick={() => cycleHouse(true)}
                className="px-2.5 py-1 rounded-xl bg-amber-400/15 border border-amber-400/40 text-xs font-mono font-bold text-amber-300 flex items-center gap-1"
              >
                <Sparkles size={12} className="animate-spin text-amber-400" />
                <span className="capitalize">{house}</span>
              </button>
            )}
            <button
              onClick={toggleLightDark}
              className="p-2 rounded-xl glass-light text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Toggle dark/light mode"
            >
              {theme === "light" ? <Moon size={18} className="text-amber-500" /> : <Sun size={18} className="text-amber-400" />}
            </button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-sm text-muted hover:text-accent transition-colors py-2 px-3 rounded-lg hover:bg-surface-lighter/50"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm font-semibold text-accent py-2 px-3 rounded-lg bg-accent/10 border border-accent/20 text-center mt-1"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type House = "gryffindor" | "hufflepuff" | "ravenclaw" | "slytherin";
export type MascotType = "lion" | "badger" | "eagle" | "snake";
export type Theme = "dark" | "light" | "gryffindor" | "hufflepuff" | "ravenclaw" | "slytherin" | "hogwarts";

export const HOUSES: House[] = ["gryffindor", "hufflepuff", "ravenclaw", "slytherin"];

export const HOUSE_MASCOTS: Record<House, MascotType> = {
  gryffindor: "lion",
  hufflepuff: "badger",
  ravenclaw: "eagle",
  slytherin: "snake",
};

interface ThemeContextType {
  theme: Theme;
  house: House;
  animatingMascot: MascotType | null;
  elementsInitiated: boolean;
  setTheme: (theme: Theme) => void;
  setHouse: (house: House, triggerAnim?: boolean) => void;
  cycleHouse: (triggerAnim?: boolean) => void;
  toggleLightDark: () => void;
  toggleHogwarts: () => void;
  triggerMascot: (mascot: MascotType) => void;
  clearMascot: () => void;
  isHouseTheme: boolean;
  toggleElementsInitiation: () => void;
  initiateElements: () => void;
  revertToNormalMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  house: "gryffindor",
  animatingMascot: null,
  elementsInitiated: false,
  setTheme: () => {},
  setHouse: () => {},
  cycleHouse: () => {},
  toggleLightDark: () => {},
  toggleHogwarts: () => {},
  triggerMascot: () => {},
  clearMascot: () => {},
  isHouseTheme: false,
  toggleElementsInitiation: () => {},
  initiateElements: () => {},
  revertToNormalMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [house, setHouseState] = useState<House>("gryffindor");
  const [animatingMascot, setAnimatingMascot] = useState<MascotType | null>(null);
  const [elementsInitiated, setElementsInitiated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    const savedHouse = localStorage.getItem("portfolio-house") as House;
    if (savedHouse && HOUSES.includes(savedHouse)) {
      setHouseState(savedHouse);
    }
    if (savedTheme) {
      if (savedTheme === "hogwarts") {
        setThemeState(savedHouse && HOUSES.includes(savedHouse) ? savedHouse : "gryffindor");
        setElementsInitiated(true);
      } else if (HOUSES.includes(savedTheme as House)) {
        setThemeState(savedTheme);
        setElementsInitiated(true);
      } else {
        setThemeState(savedTheme);
      }
    }
  }, []);

  const isHouseTheme = HOUSES.includes(theme as House) || theme === "hogwarts";

  useEffect(() => {
    if (!mounted) return;
    const effectiveTheme = theme === "hogwarts" ? house : theme;
    document.body.className = `theme-${effectiveTheme}`;
    localStorage.setItem("portfolio-theme", effectiveTheme);
    localStorage.setItem("portfolio-house", house);
  }, [theme, house, mounted]);

  const triggerMascot = (mascot: MascotType) => {
    setAnimatingMascot(mascot);
  };

  const clearMascot = () => {
    setAnimatingMascot(null);
  };

  const setHouse = (newHouse: House, triggerAnim: boolean = true) => {
    setHouseState(newHouse);
    setThemeState(newHouse);
    setElementsInitiated(true);
    if (triggerAnim) {
      triggerMascot(HOUSE_MASCOTS[newHouse]);
    }
  };

  const cycleHouse = (triggerAnim: boolean = true) => {
    const currentIndex = HOUSES.indexOf(house);
    const nextHouse = HOUSES[(currentIndex + 1) % HOUSES.length];
    setHouse(nextHouse, triggerAnim);
  };

  const toggleLightDark = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleHogwarts = () => {
    if (isHouseTheme) {
      setThemeState("dark");
    } else {
      setHouse(house, true);
    }
  };

  const toggleElementsInitiation = () => {
    setElementsInitiated((prev) => !prev);
  };

  const initiateElements = () => {
    setElementsInitiated(true);
  };

  const revertToNormalMode = () => {
    setElementsInitiated(false);
    setThemeState("dark");
    clearMascot();
  };

  const setTheme = (newTheme: Theme) => {
    if (HOUSES.includes(newTheme as House)) {
      setHouse(newTheme as House, true);
    } else if (newTheme === "hogwarts") {
      setHouse(house, true);
    } else {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        house,
        animatingMascot,
        elementsInitiated,
        setTheme,
        setHouse,
        cycleHouse,
        toggleLightDark,
        toggleHogwarts,
        triggerMascot,
        clearMascot,
        isHouseTheme,
        toggleElementsInitiation,
        initiateElements,
        revertToNormalMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


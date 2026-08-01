"use client";

import { useState, useEffect } from "react";
import TerminalLoader from "./TerminalLoader";

export default function TerminalLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lock scroll while loader is active
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = "";
    }
  }, [isLoaded]);

  return (
    <>
      <TerminalLoader onComplete={() => setIsLoaded(true)} />
      <div
        className={`loader-content transition-opacity duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </>
  );
}

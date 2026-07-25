"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Trophy } from "lucide-react";
import { certifications, awards, education } from "@/lib/data";
import clsx from "clsx";

function TiltCard({ 
  children, 
  className, 
  glowColor = "rgba(6, 182, 212, 0.12)" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Cursor position relative to card boundaries
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation degree (max 5deg)
    const rotX = -((mouseY - height / 2) / (height / 2)) * 5;
    const rotY = ((mouseX - width / 2) / (width / 2)) * 5;

    setRotateX(rotX);
    setRotateY(rotY);

    // Calculate glow highlight percent
    setGlowX((mouseX / width) * 100);
    setGlowY((mouseY / height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={clsx(
        "glass rounded-2xl p-6 relative overflow-hidden perspective-1000 group transition-shadow duration-300",
        isHovered && "glow-cyan",
        className
      )}
    >
      {/* Holographic light gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: isHovered 
            ? `radial-gradient(circle 160px at ${glowX}% ${glowY}%, ${glowColor}, transparent 80%)` 
            : "none",
          mixBlendMode: "screen",
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            Recognition & Growth
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Leadership & Certifications
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Certifications */}
          <TiltCard glowColor="rgba(6, 182, 212, 0.12)">
            <div className="flex items-center gap-2.5 mb-5">
              <Award size={20} className="text-accent" />
              <h3 className="text-lg font-bold text-text-primary">Certifications</h3>
            </div>
            <div className="space-y-5">
              {certifications.map((cert) => (
                <div key={cert.title} className="border-l border-accent/40 pl-4 group-hover:border-accent transition-colors">
                  <p className="text-sm font-bold text-text-primary">{cert.title}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{cert.description}</p>
                  <p className="text-xs text-accent mt-1.5 font-mono font-semibold">{cert.year}</p>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Awards */}
          <TiltCard glowColor="rgba(16, 185, 129, 0.12)">
            <div className="flex items-center gap-2.5 mb-5">
              <Trophy size={20} className="text-accent-emerald" />
              <h3 className="text-lg font-bold text-text-primary">Awards</h3>
            </div>
            <div className="space-y-5">
              {awards.map((award) => (
                <div key={award.title} className="border-l border-accent-emerald/40 pl-4 group-hover:border-accent-emerald transition-colors">
                  <p className="text-sm font-bold text-text-primary">{award.title}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{award.description}</p>
                  <p className="text-xs text-accent-emerald mt-1.5 font-mono font-semibold">{award.year}</p>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Education */}
          <TiltCard glowColor="rgba(59, 130, 246, 0.12)">
            <div className="flex items-center gap-2.5 mb-5">
              <GraduationCap size={20} className="text-accent-blue" />
              <h3 className="text-lg font-bold text-text-primary">Education</h3>
            </div>
            <div className="border-l border-accent-blue/40 pl-4 group-hover:border-accent-blue transition-colors">
              <p className="text-sm font-bold text-text-primary">{education.degree}</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">{education.university}</p>
              <div className="flex gap-4 mt-3 pt-1">
                <p className="text-xs text-accent-blue font-mono font-semibold">{education.period}</p>
                <p className="text-xs text-muted font-mono font-medium">CGPA: {education.cgpa} / 10</p>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

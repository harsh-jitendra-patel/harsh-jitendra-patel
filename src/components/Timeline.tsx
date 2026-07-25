"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronDown } from "lucide-react";
import { experience } from "@/lib/data";
import clsx from "clsx";

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // latest job open by default
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-padding" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            Career Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Professional Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Static Track Line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border/20" />
          
          {/* Scroll-Filling Progress Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-emerald to-accent-blue"
          />

          <div className="space-y-6">
            {experience.map((job, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Glowing Node Dot */}
                  <div
                    className={clsx(
                      "absolute left-2.5 md:left-4.5 top-6 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10",
                      isExpanded
                        ? "bg-accent border-accent scale-110 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                        : "bg-surface border-border hover:border-accent"
                    )}
                  />

                  {/* Expandable Card */}
                  <div 
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className={clsx(
                      "glass rounded-2xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden group select-none",
                      isExpanded ? "glow-cyan border-accent/20 bg-surface" : "hover:bg-surface-light/40 border-border/30"
                    )}
                  >
                    {/* Glowing highlight border indicator */}
                    <div className={clsx(
                      "absolute top-0 left-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent-emerald transition-opacity duration-300",
                      isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    )} />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                            {job.company}
                          </h3>
                          <div className="flex flex-wrap gap-2.5 text-[11px] text-muted font-mono">
                            <span className="flex items-center gap-1">
                              <MapPin size={11} /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={11} /> {job.period}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-accent font-semibold text-sm mt-1">{job.role}</p>
                        {job.formerRole && (
                          <p className="text-muted text-xs mt-0.5">Formerly: {job.formerRole}</p>
                        )}
                      </div>

                      <ChevronDown 
                        size={18} 
                        className={clsx(
                          "text-muted transition-transform duration-300 shrink-0 mt-1.5",
                          isExpanded ? "rotate-180 text-accent" : "group-hover:text-text-primary"
                        )}
                      />
                    </div>

                    {/* Expandable Highlights Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-3 mt-5 pt-5 border-t border-border/30">
                            {job.highlights.map((h) => (
                              <li key={h.title} className="flex gap-2.5 text-sm leading-relaxed">
                                <Briefcase size={14} className="text-accent shrink-0 mt-0.5" />
                                <span>
                                  <strong className="text-text-primary font-semibold">{h.title}:</strong>{" "}
                                  <span className="text-text-secondary">{h.description}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

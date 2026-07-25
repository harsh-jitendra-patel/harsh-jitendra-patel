"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/data";
import clsx from "clsx";

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            Technical Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Skills & Technologies
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-accent rounded-lg shadow-md glow-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={clsx(
                  "relative z-10 font-semibold transition-colors duration-200",
                  activeTab === cat.id ? "text-primary" : "text-muted hover:text-text-primary"
                )}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.04,
                  },
                },
                exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
              }}
              className="glass rounded-2xl p-8"
            >
              <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {activeCategory.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="px-4 py-3 rounded-xl bg-surface-light/80 border border-border/50 text-sm text-text-secondary font-semibold text-center hover:border-accent/50 hover:text-accent hover:glow-cyan transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

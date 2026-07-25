"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Lightbulb, Wrench, TrendingUp } from "lucide-react";
import { projects } from "@/lib/data";
import Card3D from "@/components/Card3D";
import clsx from "clsx";

type Tab = "problem" | "solution" | "impact";

const tabIcons: Record<Tab, React.ReactNode> = {
  problem: <Lightbulb size={16} />,
  solution: <Wrench size={16} />,
  impact: <TrendingUp size={16} />,
};

const tabLabels: Record<Tab, string> = {
  problem: "Problem",
  solution: "Solution",
  impact: "Impact",
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("problem");

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            Featured Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Case Studies
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Project selector */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-3">
            {projects.map((project, i) => (
              <motion.button
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => {
                  setActiveProject(i);
                  setActiveTab("problem");
                }}
                className="relative text-left p-4 rounded-xl transition-colors duration-200 flex items-center gap-3 cursor-pointer overflow-hidden w-full"
              >
                {activeProject === i && (
                  <motion.div
                    layoutId="activeProjectBg"
                    className="absolute inset-0 glass glow-cyan border-accent/30 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <ChevronRight
                  size={16}
                  className={clsx(
                    "relative z-10 shrink-0 transition-transform duration-200",
                    activeProject === i ? "text-accent rotate-90" : "text-muted"
                  )}
                />
                <div className="relative z-10">
                  <p
                    className={clsx(
                      "text-sm font-semibold transition-colors duration-200",
                      activeProject === i ? "text-text-primary" : "text-muted hover:text-text-secondary"
                    )}
                  >
                    {project.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Project detail with 3D tilt */}
          <div className="lg:col-span-2">
            <Card3D depth={10}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[300px]"
                >
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {projects[activeProject].title}
                    </h3>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[activeProject].technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent/10 text-accent border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Sub-tabs */}
                    <div className="flex gap-2 mb-5">
                      {(Object.keys(tabLabels) as Tab[]).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={clsx(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
                            activeTab === tab
                              ? "bg-accent/15 text-accent border border-accent/20"
                              : "text-muted hover:text-text-secondary"
                          )}
                        >
                          {tabIcons[tab]}
                          {tabLabels[tab]}
                        </button>
                      ))}
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${activeProject}-${activeTab}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-text-secondary leading-relaxed text-sm"
                      >
                        {projects[activeProject][activeTab]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Case Study Sandbox Redirection */}
                  {activeProject === 0 && (
                    <div className="mt-8 pt-4 border-t border-border/40 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <p className="text-xs text-muted font-medium">Want to test this architecture spike in real-time?</p>
                      <a
                        href="#architecture-sandbox"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-accent text-primary hover:bg-accent/90 transition-all shadow-md glow-cyan"
                      >
                        Run Live System Simulation
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}

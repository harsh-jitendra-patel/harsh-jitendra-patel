"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { metrics } from "@/lib/data";
import Card3D from "@/components/Card3D";

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text font-[family-name:var(--font-jetbrains)] tracking-tight">
      {prefix}{count}{suffix}
    </div>
  );
}

function Sparkline({ label, delay }: { label: string; delay: number }) {
  let path = "";
  let strokeColor = "#06b6d4"; // default cyan

  if (label.includes("Experience")) {
    path = "M 0 35 Q 20 20 40 30 T 80 15 T 120 18 T 160 5";
    strokeColor = "#3b82f6"; // Blue
  } else if (label.includes("Revenue")) {
    path = "M 0 38 L 30 30 L 60 25 L 90 12 L 120 15 L 160 2";
    strokeColor = "#10b981"; // Emerald
  } else if (label.includes("Compliance")) {
    path = "M 0 25 L 40 25 L 80 15 L 120 15 L 160 5";
    strokeColor = "#a855f7"; // Purple
  } else {
    // Products
    path = "M 0 35 C 30 30, 45 10, 80 25 C 115 40, 130 10, 160 5";
    strokeColor = "#f59e0b"; // Orange/Yellow
  }

  return (
    <div className="w-full h-8 mt-4 overflow-hidden flex items-center justify-center opacity-60">
      <svg className="w-full h-full" viewBox="0 0 160 40" preserveAspectRatio="none">
        <motion.path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: delay + 0.4, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function Metrics() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            Impact & Results
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Proven Track Record
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <Card3D key={metric.label} depth={15}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:glow-cyan transition-all duration-300 group flex flex-col justify-between overflow-hidden relative h-full"
              >
                {/* Dynamic light bar on top hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                  <p className="text-muted text-sm mt-2 font-medium">{metric.label}</p>
                </div>
                
                <Sparkline label={metric.label} delay={i * 0.1} />
              </motion.div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

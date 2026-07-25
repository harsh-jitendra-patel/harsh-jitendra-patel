"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Link, BookOpen, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { SlytherinTrigger } from "@/components/EasterEggTriggers";

const GithubIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Formspree endpoint
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "mrenygyp";
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_URL || `https://formspree.io/f/${formspreeId}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(", "));
        } else {
          setErrorMessage("Failed to submit form. Please check your Formspree ID or try again.");
        }
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network connection error. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="text-accent font-mono text-sm tracking-widest uppercase">
              Let&apos;s Connect
            </p>
            <SlytherinTrigger />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Get in Touch
          </h2>
          <p className="text-muted text-sm mt-3 max-w-lg mx-auto">
            Open to discussing new opportunities, technical architecture challenges, or AI-driven development strategies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="glass rounded-xl p-4 flex items-center gap-4 hover:glow-cyan transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted">Email</p>
                <p className="text-sm font-semibold text-text-primary">{personalInfo.email}</p>
              </div>
            </a>

            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 flex items-center gap-4 hover:glow-cyan transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-emerald/10 flex items-center justify-center group-hover:bg-accent-emerald/20 transition-colors">
                  <GithubIcon size={18} className="text-accent-emerald" />
                </div>
                <div>
                  <p className="text-xs text-muted">GitHub</p>
                  <p className="text-sm font-semibold text-text-primary">github.com/harshjp722</p>
                </div>
              </a>
            )}

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 flex items-center gap-4 hover:glow-cyan transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                <Link size={18} className="text-accent-blue" />
              </div>
              <div>
                <p className="text-xs text-muted">LinkedIn</p>
                <p className="text-sm font-semibold text-text-primary">Connect on LinkedIn</p>
              </div>
            </a>

            <a
              href={personalInfo.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 flex items-center gap-4 hover:glow-cyan transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center group-hover:bg-[#f59e0b]/20 transition-colors">
                <BookOpen size={18} className="text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-xs text-muted">Blog</p>
                <p className="text-sm font-semibold text-text-primary">WordPress Blog</p>
              </div>
            </a>

            <div className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                <MapPin size={18} className="text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-xs text-muted">Location</p>
                <p className="text-sm font-semibold text-text-primary">{personalInfo.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Formspree message form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-6 relative overflow-hidden"
          >
            <h3 className="text-lg font-bold text-text-primary mb-4">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted block mb-1.5 font-medium">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-border/50 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1.5 font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-border/50 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1.5 font-medium">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-border/50 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {/* Status alerts */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald text-xs flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage || "Failed to send message. Please try again."}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-primary font-semibold text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 glow-cyan cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

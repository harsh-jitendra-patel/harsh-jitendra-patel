"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

let hasShownLoader = false;

const SESSION_KEY = "hp_loader_seen";

const BOOT_LOGS = [
  "initializing core systems ...",
  "loading .NET Core & Azure modules ...",
  "compiling microservices architecture ...",
  "establishing secure OIDC protocols ...",
  "syncing AI workflow engine ...",
  "calibration complete",
];

const LOG_INTERVAL_MS = 300;

export default function TerminalLoader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(() => !hasShownLoader);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) {
      onCompleteRef.current?.();
      return;
    }

    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        hasShownLoader = true;
        setIsVisible(false);
        onCompleteRef.current?.();
        return;
      }
    } catch {
      // sessionStorage blocked — just show the loader
    }

    const markSeen = setTimeout(() => {
      hasShownLoader = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch { }
    }, 0);

    let currentProgress = 0;
    let logsComplete = false;
    let progressComplete = false;
    let finalizeTimer: ReturnType<typeof setTimeout> | null = null;

    const tryFinalize = () => {
      if (logsComplete && progressComplete) {
        finalizeTimer = setTimeout(() => {
          setIsVisible(false);
          onCompleteRef.current?.();
        }, 200);
      }
    };

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        const idx = logIndex;
        setVisibleLogs((prev) => [...prev, BOOT_LOGS[idx]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        logsComplete = true;
        tryFinalize();
      }
    }, LOG_INTERVAL_MS);

    const applyProgress = (next: number) => {
      currentProgress = Math.min(Math.max(currentProgress, next), 100);
      setProgress(Math.round(currentProgress));
    };

    const progressInterval = setInterval(() => {
      const increment = 6 + Math.random() * 9;
      const next = currentProgress + increment;
      if (next >= 100) {
        clearInterval(progressInterval);
        applyProgress(100);
        progressComplete = true;
        tryFinalize();
      } else {
        applyProgress(next);
      }
    }, 180);

    applyProgress(2);

    const safetyTimer = setTimeout(() => {
      if (!progressComplete) {
        clearInterval(progressInterval);
        applyProgress(100);
        progressComplete = true;
        tryFinalize();
      }
    }, 8000);

    return () => {
      clearTimeout(markSeen);
      clearInterval(logInterval);
      clearInterval(progressInterval);
      if (finalizeTimer) clearTimeout(finalizeTimer);
      clearTimeout(safetyTimer);
    };
  }, [isVisible]);

  const capped = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="terminal-loader fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10] p-4 select-none"
        >
          <div className="w-full max-w-xl rounded-xl border border-[#2a2d35] bg-[#13151a] shadow-[0_0_60px_rgba(0,0,0,0.7)] overflow-hidden font-mono">

            <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1f26] border-b border-[#2a2d35]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-[#6b7280] tracking-wide">
                harsh@portfolio ~
              </span>
            </div>

            <div className="px-6 pt-6 pb-4 space-y-1.5 text-sm min-h-[200px]">
              {visibleLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-[#22d3ee] leading-relaxed"
                >
                  <span className="text-[#22d3ee]/50">&gt;</span>
                  <span>
                    {log}
                    {i === visibleLogs.length - 1 && capped < 100 && (
                      <span className="ml-1 inline-block w-[7px] h-[14px] bg-[#22d3ee] animate-pulse align-middle" />
                    )}
                  </span>
                </motion.div>
              ))}

              {capped > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 pt-4 text-xs text-[#6b7280]"
                >
                  <span className="shrink-0">Progress:</span>
                  <div className="flex-1 h-[3px] bg-[#2a2d35] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#22d3ee] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${capped}%` }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </div>
                  <span className="shrink-0 text-[#22d3ee] w-8 text-right tabular-nums">
                    {capped}%
                  </span>
                </motion.div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-[#2a2d35] text-xs text-[#4b5563]/50 text-center tracking-wide">
              harsh@portfolio ~ initializing ...
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

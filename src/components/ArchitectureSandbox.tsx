"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, Cpu, Layers, Settings, Database, HardDrive, 
  Play, RotateCcw, AlertTriangle, CheckCircle, Flame, ShieldAlert
} from "lucide-react";
import { RavenclawTrigger } from "@/components/EasterEggTriggers";
import clsx from "clsx";

type SystemState = "idle" | "simulating" | "bottleneck" | "success" | "error";

interface Packet {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

export default function ArchitectureSandbox() {
  const [isOptimized, setIsOptimized] = useState(true);
  const [systemState, setSystemState] = useState<SystemState>("idle");
  const [latency, setLatency] = useState(28);
  const [memory, setMemory] = useState(195);
  const [queueSize, setQueueSize] = useState(0);
  const [cacheHits, setCacheHits] = useState(94);
  const [logs, setLogs] = useState<string[]>(["[System initialized] Standing by for instructions..."]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const packetIdCounter = useRef(0);

  // References for coordinates relative to sandbox container
  const clientRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<HTMLDivElement>(null);
  const redisRef = useRef<HTMLDivElement>(null);
  const storageRef = useRef<HTMLDivElement>(null);

  const getCoordinates = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (!elementRef.current) return { x: 0, y: 0 };
    const rect = elementRef.current.getBoundingClientRect();
    const parentRect = elementRef.current.parentElement?.getBoundingClientRect() || { left: 0, top: 0 };
    return {
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top + rect.height / 2,
    };
  };

  const addLog = (message: string) => {
    setLogs((prev) => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const addPacket = (fromRef: React.RefObject<HTMLDivElement | null>, toRef: React.RefObject<HTMLDivElement | null>, color: string, delay = 0) => {
    setTimeout(() => {
      const from = getCoordinates(fromRef);
      const to = getCoordinates(toRef);
      const id = packetIdCounter.current++;
      setPackets((prev) => [...prev, { id, from, to, color }]);
      
      // Remove packet after animation completes (approx 800ms)
      setTimeout(() => {
        setPackets((prev) => prev.filter((p) => p.id !== id));
      }, 900);
    }, delay);
  };

  const resetMetrics = () => {
    setPackets([]);
    if (isOptimized) {
      setLatency(28);
      setMemory(195);
      setQueueSize(0);
      setCacheHits(94);
      setSystemState("idle");
      setLogs(["[System reset] Standing by in Optimized Mode..."]);
    } else {
      setLatency(450);
      setMemory(720);
      setQueueSize(0);
      setCacheHits(0);
      setSystemState("idle");
      setLogs(["[System reset] Warning: direct processing active."]);
    }
  };

  // Change modes
  useEffect(() => {
    resetMetrics();
  }, [isOptimized]);

  const handleSimulate = () => {
    if (systemState === "simulating" || systemState === "bottleneck") return;
    
    setSystemState("simulating");
    
    if (isOptimized) {
      // Optimized Mode flow
      addLog("POST /api/assets/process initiated by client.");
      addPacket(clientRef, apiRef, "#06b6d4"); // Cyan packet to API
      
      setTimeout(() => {
        setLatency(35);
        setMemory(210);
        addLog("API Gateway received request. Enqueueing task to Azure Service Bus.");
        addPacket(apiRef, queueRef, "#3b82f6"); // Blue packet to queue
      }, 400);

      setTimeout(() => {
        setQueueSize(1);
        addLog("Task successfully queued. HTTP 202 Accepted returned to client.");
        addPacket(apiRef, clientRef, "#10b981", 100); // Green response packet to client
        setLatency(24); // Instant response!
      }, 800);

      setTimeout(() => {
        addLog("Azure Service Bus trigger fires. Background job dequeued by Image Worker.");
        addPacket(queueRef, workerRef, "#3b82f6");
        setQueueSize(0);
      }, 1200);

      setTimeout(() => {
        addLog("Image Worker checking Redis cache for image hash.");
        addPacket(workerRef, redisRef, "#a855f7"); // Purple to Redis
      }, 1600);

      setTimeout(() => {
        setCacheHits(94);
        addLog("Cache hit found in Redis. Skipping pixel processing computation.");
        addPacket(redisRef, workerRef, "#10b981");
      }, 2000);

      setTimeout(() => {
        addLog("Saving processed file metadata to DAM storage.");
        addPacket(workerRef, storageRef, "#10b981");
        setMemory(180);
      }, 2400);

      setTimeout(() => {
        addLog("Background processing finished successfully.");
        setSystemState("success");
      }, 3000);

    } else {
      // Legacy Mode flow
      addLog("POST /api/assets/process initiated by client.");
      addPacket(clientRef, apiRef, "#f43f5e"); // Red packet to API
      
      setTimeout(() => {
        setLatency(1200);
        setMemory(980);
        addLog("API executing heavy image resizing and buffer parsing in main thread.");
        addPacket(apiRef, storageRef, "#f43f5e"); // Directly writing to storage blocking thread
      }, 400);

      setTimeout(() => {
        setLatency(2800);
        setMemory(1480);
        addLog("High RAM consumption detected. Garbage Collection suspended.");
      }, 1200);

      setTimeout(() => {
        setLatency(4800);
        setMemory(1890);
        addLog("Thread pool starvation. API gateway response latency critical.");
        setSystemState("bottleneck");
      }, 2000);

      setTimeout(() => {
        addLog("CRITICAL: OutOfMemoryException. Client connection terminated.");
        addPacket(apiRef, clientRef, "#f43f5e");
        setSystemState("error");
      }, 3200);
    }
  };

  const handleFloodSimulation = () => {
    if (systemState === "simulating" || systemState === "bottleneck") return;

    setSystemState("simulating");
    
    if (isOptimized) {
      addLog("Simulating batch flood: 25 simultaneous image uploads.");
      
      // Fire multiple packets
      for (let i = 0; i < 5; i++) {
        addPacket(clientRef, apiRef, "#06b6d4", i * 150);
        addPacket(apiRef, queueRef, "#3b82f6", 300 + i * 150);
      }

      setTimeout(() => {
        setQueueSize(25);
        addLog("Azure Service Bus absorbed request spike. Queue size: 25.");
        setLatency(28); // Still fast response because of decoupling
        setMemory(240);
        // Reply instantly
        for (let i = 0; i < 5; i++) {
          addPacket(apiRef, clientRef, "#10b981", i * 100);
        }
      }, 800);

      // Workers processing sequentially
      setTimeout(() => {
        addLog("Image workers pulling tasks. Processing at 10 items/sec.");
        setQueueSize(15);
        addPacket(queueRef, workerRef, "#3b82f6");
        addPacket(workerRef, redisRef, "#a855f7");
      }, 1600);

      setTimeout(() => {
        setQueueSize(5);
        addPacket(workerRef, storageRef, "#10b981");
        addLog("Queue drain complete. Storage synchronization finished.");
      }, 2400);

      setTimeout(() => {
        setQueueSize(0);
        setMemory(190);
        setSystemState("success");
        addLog("Bulk processing complete. System health: EXCELLENT.");
      }, 3000);

    } else {
      addLog("Simulating batch flood: 25 simultaneous image uploads.");
      
      for (let i = 0; i < 5; i++) {
        addPacket(clientRef, apiRef, "#f43f5e", i * 100);
        addPacket(apiRef, storageRef, "#f43f5e", 200 + i * 100);
      }

      setTimeout(() => {
        setLatency(3800);
        setMemory(1650);
        addLog("Main API thread pool saturated. Active connections hanging.");
        setSystemState("bottleneck");
      }, 1000);

      setTimeout(() => {
        setLatency(9999);
        setMemory(2048);
        addLog("ERR_CONNECTION_RESET. Database locks detected.");
      }, 2000);

      setTimeout(() => {
        setSystemState("error");
        addLog("SYSTEM FAIL: IIS Application Pool crash due to memory exhaustion.");
      }, 2800);
    }
  };

  return (
    <section id="architecture-sandbox" className="section-padding bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/5 rounded-full border-dashed" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <p className="text-accent font-mono text-xs tracking-widest uppercase">
              Interactive Architecture Sandbox
            </p>
            <RavenclawTrigger />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            System Design & Performance Showcase
          </h2>
          <p className="text-muted text-sm max-w-2xl mx-auto">
            Interact with a live simulation of the **Palette Workspace & Image Processor Utility** architected by Harsh. 
            Compare the direct, legacy model with the asynchronous decoupled cloud setup.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Dashboard Control Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 glass rounded-2xl p-6 relative overflow-hidden border-border/50">
            {/* Glossy top decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-emerald to-accent-blue" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">Architecture Switch</span>
                <span className={clsx(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                  isOptimized ? "bg-accent-emerald/10 text-accent-emerald" : "bg-rose-500/10 text-rose-400"
                )}>
                  {isOptimized ? "Optimized Setup" : "Legacy Setup"}
                </span>
              </div>

              {/* Mode Toggle Slider */}
              <div className="relative flex items-center p-1 bg-surface-light/80 rounded-xl border border-border/50 mb-6 cursor-pointer">
                <div 
                  onClick={() => setIsOptimized(false)}
                  className={clsx(
                    "flex-1 text-center py-2 text-xs font-semibold rounded-lg z-10 transition-colors duration-200",
                    !isOptimized ? "text-primary font-bold" : "text-muted hover:text-text-primary"
                  )}
                >
                  Direct processing (Legacy)
                </div>
                <div 
                  onClick={() => setIsOptimized(true)}
                  className={clsx(
                    "flex-1 text-center py-2 text-xs font-semibold rounded-lg z-10 transition-colors duration-200",
                    isOptimized ? "text-primary font-bold" : "text-muted hover:text-text-primary"
                  )}
                >
                  Decoupled queue (Optimized)
                </div>

                {/* Sliding indicator */}
                <motion.div 
                  layout
                  className={clsx(
                    "absolute top-1 bottom-1 w-[48%] rounded-lg shadow-sm z-0",
                    isOptimized ? "right-1.5 bg-accent" : "left-1.5 bg-rose-500"
                  )}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </div>

              {/* Sandbox controls */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleSimulate}
                  disabled={systemState === "simulating" || systemState === "bottleneck"}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-primary font-semibold text-xs hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md glow-cyan cursor-pointer"
                >
                  <Play size={14} />
                  Trigger Image Process
                </button>
                <button
                  onClick={handleFloodSimulation}
                  disabled={systemState === "simulating" || systemState === "bottleneck"}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-lighter text-text-primary font-semibold text-xs hover:bg-surface-lighter/80 border border-border/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                  <Flame size={14} className="text-amber-500" />
                  Simulate Batch Traffic (25 requests)
                </button>
                <button
                  onClick={resetMetrics}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-transparent text-muted text-xs hover:text-text-primary transition-all duration-200 cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Reset Telemetry
                </button>
              </div>
            </div>

            {/* Telemetry output */}
            <div className="border-t border-border/40 pt-4 space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted block mb-2">Live Telemetry</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-light/60 border border-border/40 rounded-xl p-3">
                  <p className="text-[10px] text-muted uppercase font-semibold">Response Latency</p>
                  <p className={clsx(
                    "text-xl font-bold font-mono mt-1",
                    latency > 1000 ? "text-rose-500" : latency > 200 ? "text-amber-500" : "text-accent-emerald"
                  )}>
                    {latency === 9999 ? "TIMEOUT" : `${latency}ms`}
                  </p>
                </div>
                <div className="bg-surface-light/60 border border-border/40 rounded-xl p-3">
                  <p className="text-[10px] text-muted uppercase font-semibold">Heap Allocation</p>
                  <p className={clsx(
                    "text-xl font-bold font-mono mt-1",
                    memory > 1500 ? "text-rose-500" : memory > 600 ? "text-amber-500" : "text-text-primary"
                  )}>
                    {memory}MB
                  </p>
                </div>
                <div className="bg-surface-light/60 border border-border/40 rounded-xl p-3">
                  <p className="text-[10px] text-muted uppercase font-semibold">ASB Queue size</p>
                  <p className="text-xl font-bold font-mono text-accent-blue mt-1">
                    {queueSize}
                  </p>
                </div>
                <div className="bg-surface-light/60 border border-border/40 rounded-xl p-3">
                  <p className="text-[10px] text-muted uppercase font-semibold">Redis Cache hit</p>
                  <p className="text-xl font-bold font-mono text-purple-400 mt-1">
                    {cacheHits}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Topology Graph */}
          <div className="lg:col-span-8 flex flex-col justify-between glass border border-border/50 rounded-2xl p-6 relative min-h-[460px]">
            {/* Grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none rounded-2xl" />

            {/* Animation canvas overlay for drawing packets */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <AnimatePresence>
                {packets.map((packet) => (
                  <motion.div
                    key={packet.id}
                    initial={{ x: packet.from.x - 6, y: packet.from.y - 6, scale: 0.8, opacity: 0 }}
                    animate={{ x: packet.to.x - 6, y: packet.to.y - 6, scale: 1.2, opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute w-3 h-3 rounded-full blur-[2px]"
                    style={{ backgroundColor: packet.color, boxShadow: `0 0 10px ${packet.color}` }}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Nodes Layout Grid */}
            <div className="relative grid grid-cols-3 gap-y-16 gap-x-6 z-10 flex-grow py-4">
              
              {/* Client Node */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  ref={clientRef} 
                  className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300",
                    systemState === "error" ? "bg-rose-500/10 border-rose-500 glow-rose text-rose-400 animate-pulse" :
                    systemState === "success" ? "bg-accent-emerald/10 border-accent-emerald text-accent-emerald" :
                    "bg-surface-light border-border text-muted"
                  )}
                >
                  <Laptop size={24} />
                </div>
                <span className="text-[11px] font-bold mt-2 font-mono text-text-secondary text-center">Angular Client</span>
              </div>

              {/* Web API Node */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  ref={apiRef} 
                  className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300",
                    systemState === "bottleneck" ? "bg-amber-500/10 border-amber-500 text-amber-500 animate-pulse" :
                    systemState === "error" ? "bg-rose-500/10 border-rose-500 text-rose-500 animate-bounce" :
                    systemState === "simulating" ? "bg-accent/10 border-accent text-accent animate-pulse" :
                    "bg-surface-light border-border text-muted"
                  )}
                >
                  <Cpu size={24} />
                </div>
                <span className="text-[11px] font-bold mt-2 font-mono text-text-secondary text-center">.NET Core API</span>
              </div>

              {/* Redis Cache Node */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  ref={redisRef} 
                  className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300",
                    !isOptimized ? "opacity-30 bg-surface-light border-border/20 text-muted/30" : "bg-surface-light border-border text-muted",
                    systemState === "simulating" && isOptimized ? "border-purple-500 text-purple-400 glow-purple" : ""
                  )}
                >
                  <Database size={24} />
                </div>
                <span className="text-[11px] font-bold mt-2 font-mono text-text-secondary text-center">Redis Cache</span>
              </div>

              {/* DAM Storage Node */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  ref={storageRef} 
                  className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300",
                    systemState === "success" ? "bg-accent-emerald/10 border-accent-emerald text-accent-emerald" :
                    "bg-surface-light border-border text-muted"
                  )}
                >
                  <HardDrive size={24} />
                </div>
                <span className="text-[11px] font-bold mt-2 font-mono text-text-secondary text-center">DAM Storage</span>
              </div>

              {/* Service Bus Queue Node */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  ref={queueRef} 
                  className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300",
                    !isOptimized ? "opacity-30 bg-surface-light border-border/20 text-muted/30" : "bg-surface-light border-border text-muted",
                    queueSize > 0 ? "bg-accent-blue/10 border-accent-blue text-accent-blue" : ""
                  )}
                >
                  <Layers size={24} />
                </div>
                <span className="text-[11px] font-bold mt-2 font-mono text-text-secondary text-center">Service Bus Queue</span>
              </div>

              {/* Background Workers Node */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  ref={workerRef} 
                  className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300",
                    !isOptimized ? "opacity-30 bg-surface-light border-border/20 text-muted/30" : "bg-surface-light border-border text-muted",
                    systemState === "simulating" && isOptimized ? "border-accent-blue text-accent-blue animate-spin" : ""
                  )}
                >
                  <Settings size={24} />
                </div>
                <span className="text-[11px] font-bold mt-2 font-mono text-text-secondary text-center">Image Workers</span>
              </div>

            </div>

            {/* System Status Indicators & Console logs */}
            <div className="mt-8 border-t border-border/40 pt-4 z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">Console Log</span>
                <div className="flex items-center gap-1.5 ml-auto text-xs font-mono">
                  {systemState === "idle" && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" />
                      <span className="text-muted">STANDBY</span>
                    </>
                  )}
                  {systemState === "simulating" && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
                      <span className="text-accent-blue font-bold">PROCESSING</span>
                    </>
                  )}
                  {systemState === "bottleneck" && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-amber-500 font-bold flex items-center gap-1"><AlertTriangle size={12} /> BOTTLENECK</span>
                    </>
                  )}
                  {systemState === "success" && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                      <span className="text-accent-emerald font-bold flex items-center gap-1"><CheckCircle size={12} /> SUCCESS</span>
                    </>
                  )}
                  {systemState === "error" && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" />
                      <span className="text-rose-500 font-bold flex items-center gap-1"><ShieldAlert size={12} /> CRASHED</span>
                    </>
                  )}
                </div>
              </div>

              {/* Console log box */}
              <div className="bg-surface-light/80 border border-border/40 rounded-xl p-4 font-mono text-xs text-text-secondary leading-relaxed space-y-1.5 min-h-[90px]">
                {logs.map((log, i) => (
                  <div 
                    key={i} 
                    className={clsx(
                      "transition-all duration-300",
                      log.includes("CRITICAL") || log.includes("OutOfMemoryException") || log.includes("SYSTEM FAIL") ? "text-rose-500 font-bold" :
                      log.includes("Warning") || log.includes("bottleneck") ? "text-amber-500 font-bold" :
                      log.includes("Success") || log.includes("finished") || log.includes("drain") ? "text-accent-emerald font-bold" :
                      log.includes("initialized") || log.includes("reset") ? "text-muted" :
                      "text-text-secondary"
                    )}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeContext";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const connectionDistance = 120;
    const nodeCount = 50;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes(rect.width, rect.height);
    };

    const initNodes = (width: number, height: number) => {
      nodes = [];
      const density = Math.min(nodeCount, Math.floor((width * height) / 15000));
      for (let i = 0; i < density; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const updateAndDraw = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      const currentTheme = themeRef.current;

      // Draw active node lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move node
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce on boundaries
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Constrain to canvas
        nodeA.x = Math.max(0, Math.min(width, nodeA.x));
        nodeA.y = Math.max(0, Math.min(height, nodeA.y));

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18;
            if (currentTheme === "gryffindor") {
              ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
            } else if (currentTheme === "hufflepuff" || currentTheme === "hogwarts") {
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            } else if (currentTheme === "ravenclaw") {
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            } else if (currentTheme === "slytherin") {
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            } else if (currentTheme === "light") {
              ctx.strokeStyle = `rgba(2, 132, 199, ${alpha * 0.8})`;
            } else {
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            }
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }

        // Connect to mouse if active
        if (mouseRef.current.active) {
          const mdx = nodeA.x - mouseRef.current.x;
          const mdy = nodeA.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < connectionDistance * 1.5) {
            // Apply slight attraction gravity
            nodeA.vx += (mdx / mdist) * -0.005;
            nodeA.vy += (mdy / mdist) * -0.005;

            const alpha = (1 - mdist / (connectionDistance * 1.5)) * 0.3;
            if (currentTheme === "gryffindor") {
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            } else if (currentTheme === "hufflepuff" || currentTheme === "hogwarts") {
              ctx.strokeStyle = `rgba(250, 204, 21, ${alpha})`;
            } else if (currentTheme === "ravenclaw") {
              ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
            } else if (currentTheme === "slytherin") {
              ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            } else if (currentTheme === "light") {
              ctx.strokeStyle = `rgba(5, 150, 105, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            }
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // Draw node dot
        if (currentTheme === "gryffindor") {
          ctx.fillStyle = i % 2 === 0 ? "rgba(239, 68, 68, 0.7)" : "rgba(245, 158, 11, 0.7)";
        } else if (currentTheme === "hufflepuff" || currentTheme === "hogwarts") {
          ctx.fillStyle = i % 2 === 0 ? "rgba(245, 158, 11, 0.7)" : "rgba(250, 204, 21, 0.7)";
        } else if (currentTheme === "ravenclaw") {
          ctx.fillStyle = i % 2 === 0 ? "rgba(56, 189, 248, 0.7)" : "rgba(129, 140, 248, 0.7)";
        } else if (currentTheme === "slytherin") {
          ctx.fillStyle = i % 2 === 0 ? "rgba(16, 185, 129, 0.7)" : "rgba(52, 211, 153, 0.7)";
        } else if (currentTheme === "light") {
          ctx.fillStyle = i % 2 === 0 ? "rgba(2, 132, 199, 0.5)" : "rgba(5, 150, 105, 0.5)";
        } else {
          ctx.fillStyle = i % 2 === 0 ? "rgba(6, 182, 212, 0.6)" : "rgba(16, 185, 129, 0.6)";
        }
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      updateAndDraw(rect.width, rect.height);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}

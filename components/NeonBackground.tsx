"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
}

const colors = ["#22D3EE", "#A855F7", "#EC4899"];

// Статичний масив для SSR
const initialParticles: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
  size: 100,
  x: (i * 7) % 100,
  y: (i * 13) % 100,
  color: colors[i % colors.length],
  duration: 6 + (i % 5),
}));

export default function NeonBackground() {
  const [particles, setParticles] = useState<Particle[]>(initialParticles);

  useEffect(() => {
    // Генеруємо рандомні значення тільки на клієнті
    const dynamicParticles = Array.from({ length: 15 }).map(() => ({
      size: Math.random() * 150 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 5,
    }));
    setParticles(dynamicParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="rounded-full opacity-50 blur-2xl"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            top: `${p.y}%`,
            left: `${p.x}%`,
            position: "absolute",
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: p.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

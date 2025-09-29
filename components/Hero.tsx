"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
      >
        Олег Білостоцький
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-xl text-gray-400"
      >
        Front-End Developer | React | Next.js | TypeScript
      </motion.p>
    </section>
  );
}

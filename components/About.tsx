"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-purple-500 mb-8 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
      >
        Про мене
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-lg text-gray-300 leading-relaxed"
      >
        Я Front-End розробник із досвідом роботи з React, Next.js, TypeScript та
        Vue. Люблю створювати сучасні інтерфейси, оптимізовані під швидкість і
        зручність. Також обожнюю спорт і нові виклики 🚀
      </motion.p>
    </section>
  );
}

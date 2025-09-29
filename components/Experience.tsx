"use client";

import { motion } from "framer-motion";

export default function Experience() {
  const items = [
    { year: "2023–2025", text: "Middle Front-End Developer (React, Next.js)" },
    { year: "2021–2023", text: "Junior Front-End Developer, фріланс проекти" },
    { year: "Навчання", text: "Самостійне вивчення + курси по React/Next.js" },
  ];

  return (
    <section id="experience" className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
        Досвід та освіта
      </h2>
      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <p className="text-pink-500 font-semibold">{item.year}</p>
            <p className="text-gray-300">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

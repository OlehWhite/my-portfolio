"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 text-center">
      <h2 className="text-4xl font-bold text-pink-500 mb-8 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
        Звʼяжись зі мною
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="mb-4">Пиши мені на email чи в соцмережі 👇</p>
        <div className="space-x-6">
          <a
            href="mailto:yourmail@gmail.com"
            className="text-cyan-400 hover:underline"
          >
            Email
          </a>
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            className="text-purple-400 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            className="text-pink-400 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}

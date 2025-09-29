"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-pink-500 mb-12 text-center drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
        Мої проекти
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition"
          >
            <Link href={`/projects/${project.slug}`}>
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-cyan-400">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden shadow-xl group"
    >
      {/* 🌌 Neon glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-600/10 to-pink-500/20 animate-pulse-slow opacity-70 blur-2xl" />
      {/* Основний контент */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden border border-cyan-400/30 group-hover:border-cyan-400/70 transition"
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-52 object-cover opacity-90 group-hover:opacity-100 transition"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,1)] transition">
            {project.title}
          </h3>
          <p className="text-gray-300">{project.shortDescription}</p>
        </div>
      </Link>
    </motion.div>
  );
}

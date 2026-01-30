"use client";

import Image from "next/image";
import { useState } from "react";
import { IPortfolio } from "@/types/portfolio.types";
import ClickAnimation from "@/components/ui/ClickAnimation";

interface Props {
  project: IPortfolio;
}

const AnimateLogo = ({ project }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const showVideo = hovered || active;

  return (
    <div
      className="relative w-full h-[200px] md:w-[500px] md:h-[320px] rounded-lg overflow-hidden"
      onMouseEnter={() => project.video && setHovered(true)}
      onMouseLeave={() => project.video && setHovered(false)}
    >
      <Image
        src={project.image}
        fill
        alt={project.title}
        title={project.title}
        className={`object-cover rounded-lg transition-opacity duration-500 ${
          showVideo ? "opacity-0" : "opacity-100"
        }`}
      />

      {project.video && !showVideo && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="md:hidden absolute inset-0 flex items-center justify-center opacity-70"
          aria-label="Play preview"
        >
          <ClickAnimation />
          <span className="sr-only">Play preview</span>
        </button>
      )}

      {project.video && showVideo && (
        <>
          {active && (
            <button
              type="button"
              onClick={() => setActive(false)}
              className="md:hidden absolute top-2 right-2 z-10 rounded-full bg-black/60 text-white w-8 h-8 flex items-center justify-center"
              aria-label="Close preview"
            >
              ✕
            </button>
          )}

          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 opacity-100"
          />
        </>
      )}
    </div>
  );
};

export default AnimateLogo;

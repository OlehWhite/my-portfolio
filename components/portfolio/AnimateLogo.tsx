"use client";

import Image from "next/image";
import { useState } from "react";
import { IPortfolio } from "@/types/portfolio.types";

interface Props {
  project: IPortfolio;
}

const AnimateLogo = ({ project }: Props) => {
  const [hovered, setHovered] = useState(false);

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
          hovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {project.video && (
        <video
          src={project.video}
          autoPlay
          loop
          muted
          className={`none md:flex absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default AnimateLogo;

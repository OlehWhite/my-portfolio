"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";

const options: LenisOptions = {
  lerp: 0.075,
  smoothWheel: true,
  anchors: true,
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
};

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;

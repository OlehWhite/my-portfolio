"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
}

const AnimationLayout = ({ children, delay = 0 }: Props) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    margin: "-40px",
  });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={
        reduce || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="flex w-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
};

export default AnimationLayout;

"use client";

import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MobAlbum from "@/components/case/MobAlbum";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";

interface Props {
  album: string[];
  alt: string;
}

const Album = ({ album, alt }: Props) => {
  const t = getMessages(useLocale());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const closeModal = () => setSelectedIndex(null);

  const showPrev = (event?: MouseEvent) => {
    event?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + album.length) % album.length : null,
    );
  };

  const showNext = (event?: MouseEvent) => {
    event?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % album.length : null,
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + album.length) % album.length : null,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % album.length : null,
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, album.length]);

  if (album.length === 0) return null;

  return (
    <div>
      <MobAlbum album={album} alt={alt} onSelect={setSelectedIndex} />

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-inverse/85 p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} — ${t.caseStudy.gallery}`}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-white"
              aria-label={t.caseStudy.closeGallery}
            >
              <X size={28} />
            </button>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full text-white md:left-6"
              aria-label={t.caseStudy.previous}
            >
              <ChevronLeft size={36} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative h-[80vh] w-[min(92vw,1100px)]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={album[selectedIndex]}
                fill
                alt={`${alt} screenshot ${selectedIndex + 1}`}
                className="object-contain"
                sizes="92vw"
              />
            </motion.div>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full text-white md:right-6"
              aria-label={t.caseStudy.next}
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Album;

"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  album: string[];
}

const Album = ({ album }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const showPrev = (e: MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + album.length) % album.length : null,
    );
  };

  const showNext = (e: MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % album.length : null,
    );
  };

  return (
    <div className="hidden xl:flex items-center mt-[200px] ml-[250px]">
      {album
        .slice(0, 10)
        .map((picture, index) => (
          <div
            key={index}
            className="mx-[-360px] relative w-[800px] h-[440px] perspective"
            onClick={() => openModal(index)}
          >
            <div className="relative w-full h-full transform-style-preserve ml-[-40px] tilt">
              <Image
                src={picture}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                alt={picture}
                title={picture}
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        ))
        .reverse()}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute cursor-pointer top-6 right-6 text-white hover:text-gray-300 transition"
            >
              <X size={32} />
            </button>

            <button
              onClick={showPrev}
              className="absolute cursor-pointer left-8 text-white hover:text-gray-300 transition"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-[80vw] h-[80vh]"
            >
              <Image
                src={album[selectedIndex]}
                fill
                alt={`Image ${selectedIndex + 1}`}
                className="object-contain rounded-xl shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </motion.div>

            <button
              onClick={showNext}
              className="absolute cursor-pointer right-8 text-white hover:text-gray-300 transition"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Album;

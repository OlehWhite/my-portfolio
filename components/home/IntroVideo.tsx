"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { HERO } from "@/constants/home";

const IntroVideo = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="secondary" onClick={handleOpen}>
        Intro video
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[800px] aspect-video bg-black rounded-xl shadow-xl">
            <iframe
              src={HERO.intro}
              title="Intro Video"
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-red-500 transition"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IntroVideo;

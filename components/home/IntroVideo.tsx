"use client";

import { useEffect, useState } from "react";
import { HERO } from "@/constants/home";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";

const IntroVideo = () => {
  const t = getMessages(useLocale());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-transparent p-0 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        {t.hero.watchIntro}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.hero.introLabel}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-sm text-white"
            >
              {t.hero.closeIntro}
            </button>
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                src={HERO.intro}
                title={t.hero.introLabel}
                className="h-full w-full"
                allow="encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IntroVideo;

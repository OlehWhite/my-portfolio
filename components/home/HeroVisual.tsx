"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const INTERVAL = 6200;

export interface HeroCase {
  id: string;
  title: string;
  image: string;
  href: string;
}

interface Props {
  cases: HeroCase[];
}

const usePrefersReducedMotion = () => {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduce;
};

const CaseFrame = ({
  project,
  slot,
  priority,
}: {
  project: HeroCase;
  slot: number;
  priority?: boolean;
}) => {
  const [layers, setLayers] = useState<HeroCase[]>([project]);

  useEffect(() => {
    setLayers((current) => {
      const top = current[current.length - 1];
      if (!top || top.id === project.id) return current;
      return [top, project];
    });
  }, [project]);

  useEffect(() => {
    if (layers.length < 2) return;
    const timer = window.setTimeout(() => {
      setLayers((current) => current.slice(-1));
    }, 980 + slot * 90);
    return () => window.clearTimeout(timer);
  }, [layers, slot]);

  const [captions, setCaptions] = useState<HeroCase[]>([project]);

  useEffect(() => {
    setCaptions((current) => {
      const top = current[current.length - 1];
      if (!top || top.id === project.id) return current;
      return [top, project];
    });
  }, [project]);

  useEffect(() => {
    if (captions.length < 2) return;
    const timer = window.setTimeout(() => {
      setCaptions((current) => current.slice(-1));
    }, 720 + slot * 70);
    return () => window.clearTimeout(timer);
  }, [captions, slot]);

  return (
    <Link
      href={project.href}
      className="group block overflow-hidden rounded-2xl border border-line bg-card no-underline shadow-[0_12px_40px_rgba(17,19,24,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-ink/15 hover:shadow-[0_18px_44px_rgba(17,19,24,0.1)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eef1f4]">
        {layers.map((layer, layerIndex) => {
          const entering = layerIndex === layers.length - 1 && layers.length > 1;
          const leaving = layerIndex === 0 && layers.length > 1;

          return (
            <div
              key={layer.id}
              className="absolute inset-0 bg-[#eef1f4]"
              style={{
                zIndex: layerIndex,
                animation: entering
                  ? `hero-case-in 900ms cubic-bezier(0.22, 1, 0.36, 1) ${slot * 90}ms both`
                  : leaving
                    ? `hero-case-out 900ms ease ${slot * 90}ms both`
                    : undefined,
              }}
            >
              <Image
                src={layer.image}
                alt=""
                fill
                priority={priority && layerIndex === layers.length - 1}
                sizes={
                  slot === 0
                    ? "(max-width: 1024px) 100vw, 560px"
                    : "(max-width: 1024px) 50vw, 280px"
                }
                className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          );
        })}
      </div>
      <div className="relative h-10 overflow-hidden">
        {captions.map((caption, captionIndex) => {
          const entering =
            captionIndex === captions.length - 1 && captions.length > 1;
          const leaving = captionIndex === 0 && captions.length > 1;

          return (
            <p
              key={caption.id}
              className="absolute inset-0 m-0 flex items-center bg-card px-3 text-[11px] font-medium uppercase leading-none tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-ink"
              style={{
                zIndex: captionIndex,
                animation: entering
                  ? `hero-case-caption 420ms cubic-bezier(0.22, 1, 0.36, 1) ${160 + slot * 70}ms both`
                  : leaving
                    ? `hero-case-caption-out 220ms ease ${slot * 40}ms both`
                    : undefined,
              }}
            >
              <span className="truncate">{caption.title}</span>
            </p>
          );
        })}
      </div>
    </Link>
  );
};

const HeroVisual = ({ cases = [] }: Props) => {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const lastAdvance = useRef(0);
  const canRotate = !reduce && cases.length > 3;

  if (!cases.length) return null;

  const visible = [0, 1, 2].flatMap((offset) => {
    const project = cases[(index + offset) % cases.length];
    return project ? [project] : [];
  });

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <CaseFrame project={visible[0]} slot={0} priority={index === 0} />
        </div>
        {visible[1] && <CaseFrame project={visible[1]} slot={1} />}
        {visible[2] && <CaseFrame project={visible[2]} slot={2} />}
      </div>

      {canRotate && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
            <div
              key={index}
              className="h-full w-full origin-left bg-ink/30"
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget || paused) return;
                const now = performance.now();
                if (now - lastAdvance.current < 1000) return;
                lastAdvance.current = now;
                setIndex((current) => (current + 1) % cases.length);
              }}
              style={{
                animationName: "hero-case-progress",
                animationDuration: `${INTERVAL}ms`,
                animationTimingFunction: "linear",
                animationFillMode: "forwards",
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            {cases.map((item, itemIndex) => {
              const active = itemIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.title}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-1.5 rounded-full border-0 p-0 transition-all duration-300 ${
                    active ? "w-4 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroVisual;

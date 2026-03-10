"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IServices } from "@/types/services.types";

interface Props {
  data: IServices[];
}

const isSectionHeading = (text: string) =>
  /^[💡🧠🛠💬💻📩]/.test(text.trim()) && text.includes(":");

const isListBullet = (text: string) => {
  const t = text.trim();
  return /^[📌✅]/.test(t) || /^\d[\uFE0F\u20E3]*/.test(t);
};

/** Returns [bulletLabel, content] without breaking Unicode (e.g. 1️⃣) */
function splitBulletAndContent(line: string): [string, string] {
  const t = line.trim();
  const numberedMatch = t.match(/^(\d)\s*[\uFE0F\u20E3]*\s*(.*)/);
  if (numberedMatch) {
    return [numberedMatch[1] + ".", numberedMatch[2].trim()];
  }
  if (/^[📌✅]/.test(t)) {
    return [t[0], t.slice(1).trim()];
  }
  return [t.slice(0, 2), t.slice(2).trim()];
}

const isKeywordsLine = (text: string) =>
  text.trim().toUpperCase().startsWith("KEYWORDS");

/** If line is only "KEYWORDS:" with no list, the list is often on the next line. Merge them. */
function mergeKeywordsWithNextLine(lines: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const isOnlyKeywordLabel =
      trimmed.toUpperCase() === "KEYWORDS" ||
      trimmed.toUpperCase() === "KEYWORDS:";
    if (isOnlyKeywordLabel && i + 1 < lines.length) {
      result.push("KEYWORDS: " + lines[i + 1].trim());
      i++;
      continue;
    }
    result.push(lines[i]);
  }
  return result;
}

function ServiceParagraph({ text }: { text: string }) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  if (isKeywordsLine(trimmed)) {
    const listStr = trimmed.replace(/^KEYWORDS:\s*/i, "").trim();
    const keywords = listStr ? listStr.split(",").map((kw) => kw.trim()).filter(Boolean) : [];
    if (keywords.length === 0) return null;
    return (
      <div className="mt-6 pt-4 border-t border-secondary/30">
        <p className="text-secondary text-sm font-medium mb-2">Keywords</p>
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-md bg-primary/15 text-primary text-xs"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (isSectionHeading(trimmed)) {
    return (
      <h3 className="text-primary text-lg md:text-xl font-semibold mt-6 mb-2 first:mt-0">
        {trimmed}
      </h3>
    );
  }

  if (isListBullet(trimmed)) {
    const [bullet, content] = splitBulletAndContent(trimmed);
    return (
      <div
        role="listitem"
        className="flex gap-2 text-light/90 text-base md:text-lg py-1.5 pl-3 ml-1 border-l-2 border-primary/50"
      >
        <span className="text-primary shrink-0 min-w-[1.5rem]">{bullet}</span>
        <span>{content}</span>
      </div>
    );
  }

  return (
    <p className="text-light/90 text-base md:text-lg leading-relaxed mb-3 last:mb-0">
      {trimmed}
    </p>
  );
}

const Services = ({ data }: Props) => {
  const [activeId, setActiveId] = useState<number>(data[0]?.id ?? 0);

  const handleSelect = (id: number) => setActiveId(id);

  const activeService = useMemo(
    () => data.find((s) => s.id === activeId),
    [data, activeId],
  );

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex gap-2 md:gap-3 flex-wrap">
        {data.map((service) => (
          <button
            key={service.id}
            onClick={() => handleSelect(service.id)}
            className={`
              px-4 py-2.5 rounded-xl text-sm md:text-base font-medium
              transition-all duration-200 cursor-pointer
              border-2
              ${
                activeId === service.id
                  ? "bg-primary border-primary text-light shadow-lg shadow-primary/25"
                  : "bg-dark border-secondary/40 text-secondary hover:border-primary/60 hover:text-light"
              }
            `}
          >
            {service.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeService && (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full rounded-2xl bg-[#001a2e] border border-secondary/20 shadow-xl p-6 md:p-8 box-border"
          >
            <div className="space-y-1">
              {mergeKeywordsWithNextLine(activeService.text).map((paragraph, index) => (
                <ServiceParagraph
                  key={`${activeService.id}-${index}`}
                  text={paragraph}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;

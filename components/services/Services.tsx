"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { IServices } from "@/types/services.types";
import { SERVICE_TAGS } from "@/constants/services";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";

interface Props {
  data: IServices[];
}

const isSectionHeading = (text: string) =>
  /^[💡🧠🛠💬💻📩]/u.test(text.trim()) && text.includes(":");

const isListBullet = (text: string) => {
  const t = text.trim();
  return /^[📌✅]/u.test(t) || /^\d[\uFE0F\u20E3]*/u.test(t);
};

function splitBulletAndContent(line: string): [string, string] {
  const t = line.trim();
  const numberedMatch = t.match(/^(\d)\s*[\uFE0F\u20E3]*\s*(.*)/);
  if (numberedMatch) {
    return [numberedMatch[1] + ".", numberedMatch[2].trim()];
  }
  if (/^[📌✅]/u.test(t)) {
    return [t[0], t.slice(1).trim()];
  }
  return [t.slice(0, 2), t.slice(2).trim()];
}

const isKeywordsLine = (text: string) =>
  text.trim().toUpperCase().startsWith("KEYWORDS");

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
  const t = getMessages(useLocale());
  const trimmed = text.trim();
  if (!trimmed) return null;

  if (isKeywordsLine(trimmed)) {
    const listStr = trimmed.replace(/^KEYWORDS:\s*/i, "").trim();
    const keywords = listStr
      ? listStr
          .split(",")
          .map((kw) => kw.trim())
          .filter(Boolean)
      : [];
    if (keywords.length === 0) return null;
    return (
      <div className="mt-6 border-t border-line pt-4">
        <p className="mb-2 text-sm font-medium text-muted">{t.services.keywords}</p>
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-md bg-accent-soft px-2 py-1 text-xs text-accent"
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
      <h3 className="mb-2 mt-6 text-lg font-semibold text-ink first:mt-0">
        {trimmed}
      </h3>
    );
  }

  if (isListBullet(trimmed)) {
    const [bullet, content] = splitBulletAndContent(trimmed);
    return (
      <p className="flex gap-2 border-l-2 border-accent/40 py-1.5 pl-3 text-base leading-relaxed text-ink">
        <span className="min-w-[1.5rem] shrink-0 text-accent">{bullet}</span>
        <span>{content}</span>
      </p>
    );
  }

  return (
    <p className="mb-3 text-base leading-relaxed text-ink/90 last:mb-0">
      {trimmed}
    </p>
  );
}

const Services = ({ data }: Props) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const paragraphs = useMemo(() => {
    const map = new Map<number, string[]>();
    data.forEach((service) => {
      map.set(service.id, mergeKeywordsWithNextLine(service.text));
    });
    return map;
  }, [data]);

  return (
    <div className="mt-10 divide-y divide-line border-y border-line">
      {data.map((service, index) => {
        const open = activeId === service.id;
        const summary = service.text[0]?.trim() ?? "";
        const tags = SERVICE_TAGS[service.id] ?? [];
        const panelId = `service-panel-${service.id}`;

        return (
          <article key={service.id} className="py-6 md:py-8">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() =>
                setActiveId((current) =>
                  current === service.id ? null : service.id,
                )
              }
              className="flex w-full items-start gap-4 bg-transparent p-0 text-left"
            >
              <span className="pt-1 text-xs font-medium tracking-[0.14em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <span className="text-xl font-semibold text-ink md:text-2xl">
                    {service.title}
                  </span>
                  {tags.length > 0 && (
                    <span className="flex flex-wrap gap-2 md:max-w-sm md:justify-end">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-canvas px-2 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                {!open && summary && (
                  <span className="mt-3 line-clamp-2 block text-sm leading-relaxed text-muted md:text-base">
                    {summary}
                  </span>
                )}
              </span>
              <ChevronDown
                size={18}
                aria-hidden
                className={`mt-1 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div id={panelId} className="mt-5 pl-0 md:pl-10">
                <div className="space-y-1">
                  {(paragraphs.get(service.id) ?? []).map((paragraph, paragraphIndex) => (
                    <ServiceParagraph
                      key={`${service.id}-${paragraphIndex}`}
                      text={paragraph}
                    />
                  ))}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default Services;

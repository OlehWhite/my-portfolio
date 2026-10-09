"use client";

import { useMemo, useState } from "react";
import { PORTFOLIO } from "@/constants/portfolios";
import Project from "@/components/portfolio/Project";
import { specializationLabel } from "@/lib/project";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";

const FILTERS = ["All", "Next", "React", "Nuxt", "Webflow"] as const;

const PortfolioBrowser = () => {
  const t = getMessages(useLocale());
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const projects = useMemo(
    () =>
      filter === "All"
        ? PORTFOLIO
        : PORTFOLIO.filter((project) => project.specialization === filter),
    [filter],
  );

  return (
    <div className="mt-10">
      <div
        className="flex flex-wrap gap-2"
        role="toolbar"
        aria-label={t.portfolio.filterLabel}
      >
        {FILTERS.map((item) => {
          const active = filter === item;
          const label = item === "All" ? t.portfolio.all : specializationLabel(item);
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={`min-h-10 rounded-full px-4 py-2 text-sm transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "border border-line bg-card text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-line px-6 py-12 text-center text-muted">
          {t.portfolio.empty}
        </p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioBrowser;

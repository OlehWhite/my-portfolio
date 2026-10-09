"use client";

import Image from "next/image";
import Link from "next/link";
import { IPortfolio } from "@/types/portfolio.types";
import { projectLead, specializationLabel } from "@/lib/project";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";
import { localizeProject } from "@/lib/content";

interface Props {
  project: IPortfolio;
}

const Project = ({ project }: Props) => {
  const locale = useLocale();
  const t = getMessages(locale);
  const localized = localizeProject(project, locale);
  const preview = localized.images[0] || localized.image;
  const lead = projectLead(localized);
  const href = withLang(`/portfolio/${localized.id}`, locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-ink/20">
      <Link
        href={href}
        className="relative block aspect-[16/10] border-b border-line bg-[#eef1f4]"
      >
        <Image
          src={preview}
          alt={localized.title}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-contain p-3"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="m-0 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          {specializationLabel(localized.specialization)}
        </p>
        <h3 className="m-0 text-lg font-semibold leading-snug text-ink">
          <Link
            href={href}
            className="text-ink no-underline transition-colors group-hover:text-accent"
          >
            {localized.title}
          </Link>
        </h3>
        {lead && (
          <p className="m-0 line-clamp-3 text-sm leading-relaxed text-muted">
            {lead}
          </p>
        )}
        <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0 pt-2">
          {localized.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md bg-canvas px-2 py-1 text-xs text-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-3 pt-1 text-sm">
          <Link
            href={href}
            className="font-medium text-ink no-underline hover:text-accent"
          >
            {t.hero.viewCase}
          </Link>
          {localized.link && (
            <a
              href={localized.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted no-underline hover:text-accent"
            >
              {t.hero.liveSite}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default Project;

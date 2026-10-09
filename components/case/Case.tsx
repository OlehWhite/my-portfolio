import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { IPortfolio } from "@/types/portfolio.types";
import { projectLead, specializationLabel } from "@/lib/project";
import Button from "@/components/Button";
import Album from "@/components/case/Album";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";
import { localizeProject } from "@/lib/content";

interface Props {
  project: IPortfolio;
}

function isSectionLabel(line: string) {
  const text = line
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .replace(/:$/, "")
    .trim();
  if (!text || text.length > 42) return false;
  if (text.split(/\s+/).length > 5) return false;
  return /overview|challenge|process|outcome|key features|key challenges|project description|technologies used|business value|call to action|result|work stages|огляд|процес|результат|виклик|можливості|технології|опис|етапи|мета|реалізація/i.test(
    text,
  );
}

const Case = async ({ project }: Props) => {
  const locale = await getLocale();
  const t = getMessages(locale);
  const item = localizeProject(project, locale);
  const lead = projectLead(item);
  const preview = item.images[0];

  return (
    <article className="flex flex-col gap-10">
      <div>
        <Link
          href={withLang("/portfolio", locale)}
          className="inline-flex items-center gap-2 text-sm text-muted no-underline hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden />
          {t.caseStudy.back}
        </Link>

        <p className="mb-0 mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          {specializationLabel(item.specialization)}
        </p>
        <h1 className="mb-0 mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
          {item.title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {lead}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {item.link && (
            <Button href={item.link} arrow>
              {t.caseStudy.visit}
            </Button>
          )}
        </div>

        <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
          {item.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-line bg-card px-2.5 py-1 text-xs text-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {item.video ? (
        <video
          className="w-full rounded-2xl border border-line bg-black"
          src={item.video}
          controls
          playsInline
          preload="metadata"
          poster={preview}
        />
      ) : (
        preview && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-[#eef1f4]">
            <Image
              src={preview}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1120px"
              className="object-contain p-3"
            />
          </div>
        )
      )}

      <div className="max-w-3xl space-y-3">
        {item.description.map((line, index) => {
          const text = line.trim();
          if (!text) return null;
          if (isSectionLabel(text)) {
            return (
              <h2
                key={`${text}-${index}`}
                className="mb-1 mt-8 text-xl font-semibold text-ink first:mt-0"
              >
                {text}
              </h2>
            );
          }
          return (
            <p
              key={`${text}-${index}`}
              className="m-0 text-base leading-relaxed text-ink/90"
            >
              {text}
            </p>
          );
        })}
      </div>

      {item.images.length > 0 && (
        <section>
          <h2 className="m-0 text-2xl font-semibold text-ink">{t.caseStudy.gallery}</h2>
          <div className="mt-5">
            <Album album={item.images} alt={item.title} />
          </div>
        </section>
      )}
    </article>
  );
};

export default Case;

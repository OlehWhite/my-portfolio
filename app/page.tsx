import type { Metadata } from "next";
import MainLayout from "@/layouts/MainLayout";
import { FEATURED_IDS, STACK } from "@/constants/home";
import { PORTFOLIO } from "@/constants/portfolios";
import { SITE } from "@/constants/site";
import { getMessages } from "@/constants/messages";
import Button from "@/components/Button";
import IntroVideo from "@/components/home/IntroVideo";
import HeroVisual from "@/components/home/HeroVisual";
import Project from "@/components/portfolio/Project";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCTA from "@/components/ui/ContactCTA";
import Link from "next/link";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";
import { localizeProject } from "@/lib/content";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = getMessages(locale);

  return {
    title: { absolute: t.meta.homeTitle },
    description: t.meta.homeDescription,
    alternates: {
      canonical: withLang("/", locale),
      languages: { en: withLang("/", "en"), uk: withLang("/", "ua") },
    },
    openGraph: {
      title: t.meta.homeTitle,
      description: t.meta.homeDescription,
      images: [{ url: "/images/oleh-bilostotskyi.jpg" }],
    },
  };
};

const HomePage = async () => {
  const locale = await getLocale();
  const t = getMessages(locale);
  const featured = FEATURED_IDS.flatMap((id) => {
    const project = PORTFOLIO.find((item) => item.id === id);
    return project ? [localizeProject(project, locale)] : [];
  });

  return (
    <MainLayout>
      <section className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <h1 className="mb-0 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            {t.hero.titleBefore}{" "}
            <span className="text-accent">{t.hero.titleAccent}</span>
          </h1>
          <div className="mt-6 max-w-xl space-y-3">
            {t.hero.paragraphs.map((text) => (
              <p key={text} className="m-0 text-base leading-relaxed text-muted">
                {text}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/portfolio" arrow>
              {t.hero.explore}
            </Button>
            <Button href="/contact" color="secondary">
              {t.letsTalk}
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <IntroVideo />
            <a
              href={SITE.cv}
              download
              className="text-sm text-muted no-underline underline-offset-4 hover:text-ink hover:underline"
            >
              {t.hero.downloadCv}
            </a>
          </div>
        </div>
        <HeroVisual
          labels={{
            corporate: t.hero.shots.corporate,
            admin: t.hero.shots.admin,
            tap: t.hero.shots.tap,
          }}
        />
      </section>

      <section className="mt-16 border-t border-line pt-8 md:mt-20">
        <p className="m-0 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          {t.hero.techStack}
        </p>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
          {STACK.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {t.hero.experience}
        </p>
      </section>

      <section className="mt-16 md:mt-24">
        <SectionHeading
          eyebrow={t.hero.selected}
          title={t.hero.recent}
          action={
            <Link
              href={withLang("/portfolio", locale)}
              className="text-sm font-medium text-ink no-underline hover:text-accent"
            >
              {t.hero.viewAll}
            </Link>
          }
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </section>

      <div className="mt-16 md:mt-24">
        <ContactCTA title={t.cta.title} text={t.cta.text} />
      </div>
    </MainLayout>
  );
};

export default HomePage;

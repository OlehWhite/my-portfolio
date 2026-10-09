import type { Metadata } from "next";
import MainLayout from "@/layouts/MainLayout";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = getMessages(locale);

  return {
    title: t.meta.portfolioTitle,
    description: t.meta.portfolioDescription,
    alternates: {
      canonical: withLang("/portfolio", locale),
      languages: {
        en: withLang("/portfolio", "en"),
        uk: withLang("/portfolio", "ua"),
      },
    },
    openGraph: {
      title: t.meta.portfolioTitle,
      description: t.meta.portfolioDescription,
    },
  };
};

export default async function PortfolioPage() {
  const t = getMessages(await getLocale());

  return (
    <MainLayout>
      <div className="grid items-end gap-6 md:grid-cols-[1.25fr_0.75fr]">
        <h1 className="m-0 text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
          {t.portfolio.titleBefore}{" "}
          <span className="text-accent">{t.portfolio.titleAccent}</span>
        </h1>
        <p className="m-0 text-base leading-relaxed text-muted md:text-lg">
          {t.portfolio.intro}
        </p>
      </div>
      <PortfolioBrowser />
    </MainLayout>
  );
}

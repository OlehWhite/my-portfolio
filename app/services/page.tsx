import type { Metadata } from "next";
import MainLayout from "@/layouts/MainLayout";
import Services from "@/components/services/Services";
import ContactCTA from "@/components/ui/ContactCTA";
import { getMessages } from "@/constants/messages";
import { getCapabilities, getProcess, getServices } from "@/lib/content";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = getMessages(locale);

  return {
    title: t.meta.servicesTitle,
    description: t.meta.servicesDescription,
    alternates: {
      canonical: withLang("/services", locale),
      languages: {
        en: withLang("/services", "en"),
        uk: withLang("/services", "ua"),
      },
    },
    openGraph: {
      title: t.meta.servicesTitle,
      description: t.meta.servicesDescription,
    },
  };
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <MainLayout>
      <section>
        <div className="grid items-end gap-6 md:grid-cols-[1.35fr_0.75fr]">
          <h1 className="m-0 text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            {t.services.titleBefore}{" "}
            <span className="text-accent">{t.services.titleAccent}</span>
          </h1>
          <p className="m-0 text-base leading-relaxed text-muted md:text-lg">
            {t.services.intro}
          </p>
        </div>

        <Services data={getServices(locale)} />
      </section>

      <section className="mt-16 md:mt-24">
        <h2 className="m-0 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {t.services.includes}
        </h2>
        <ul className="m-0 mt-6 list-none divide-y divide-line border-y border-line p-0">
          {getCapabilities(locale).map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between md:gap-10"
            >
              <h3 className="m-0 text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="m-0 text-sm leading-relaxed text-muted md:max-w-md md:text-right">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 md:mt-24">
        <div className="max-w-2xl">
          <p className="m-0 text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {t.services.processEyebrow}
          </p>
          <h2 className="mb-0 mt-3 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            {t.services.processBefore}{" "}
            <span className="text-accent">{t.services.processAccent}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {t.services.processText}
          </p>
        </div>
        <ol className="m-0 mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {getProcess(locale).map((step) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-card p-5"
            >
              <p className="m-0 text-xs font-medium tracking-[0.14em] text-accent">
                {step.step}
              </p>
              <h3 className="mb-0 mt-3 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-16 md:mt-24">
        <ContactCTA title={t.services.ctaTitle} text={t.services.ctaText} />
      </div>
    </MainLayout>
  );
}

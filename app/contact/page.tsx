import type { Metadata } from "next";
import MainLayout from "@/layouts/MainLayout";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/constants/site";
import { SOCIAL_MEDIAS } from "@/constants/socials-medias";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";

const LABELS: Record<string, string> = {
  LinkedIn: "LinkedIn",
  Git: "GitHub",
};

function profileName(title: string, link: string) {
  if (title === "LinkedIn") return SITE.name;
  const slug = link.split("/").filter(Boolean).pop();
  return slug || LABELS[title] || title;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = getMessages(locale);

  return {
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    alternates: {
      canonical: withLang("/contact", locale),
      languages: {
        en: withLang("/contact", "en"),
        uk: withLang("/contact", "ua"),
      },
    },
    openGraph: {
      title: t.meta.contactTitle,
      description: t.meta.contactDescription,
    },
  };
};

const ContactPage = async () => {
  const t = getMessages(await getLocale()).contact;

  return (
    <MainLayout>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="order-1">
          <p className="m-0 text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {t.eyebrow}
          </p>
          <h1 className="mb-0 mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            {t.titleBefore} <span className="text-accent">{t.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            {t.intro}
          </p>

          <ul className="m-0 mt-8 list-none space-y-5 p-0">
            <li>
              <span className="mb-1 block text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {t.email}
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="text-lg text-ink no-underline hover:text-accent"
              >
                {SITE.email}
              </a>
            </li>
            {SOCIAL_MEDIAS.map((item) => (
              <li key={item.link}>
                <span className="mb-1 block text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {LABELS[item.title] ?? item.title}
                </span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-ink no-underline hover:text-accent"
                >
                  {profileName(item.title, item.link)}
                </a>
              </li>
            ))}
            <li>
              <span className="mb-1 block text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {t.cv}
              </span>
              <a
                href={SITE.cv}
                download
                className="text-lg text-ink no-underline hover:text-accent"
              >
                {t.downloadCv}
              </a>
            </li>
          </ul>
        </div>

        <div className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="rounded-2xl border border-line bg-card p-6 md:p-8 lg:sticky lg:top-24">
            <h2 className="m-0 text-lg font-semibold text-ink">{t.sendTitle}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="order-3">
          <div className="overflow-hidden rounded-2xl border border-line bg-card p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="m-0 text-lg font-semibold text-ink">{t.cvPreview}</h2>
              <a
                href={SITE.cv}
                download
                className="text-sm text-accent no-underline hover:underline"
              >
                {t.download}
              </a>
            </div>
            <iframe
              src={SITE.cv}
              title={t.cvPreview}
              className="h-[480px] w-full rounded-lg border border-line bg-white md:h-[640px]"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;

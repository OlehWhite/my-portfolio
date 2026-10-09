import type { Metadata } from "next";
import MainLayout from "@/layouts/MainLayout";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = getMessages(locale);

  return {
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    alternates: {
      canonical: withLang("/about", locale),
      languages: { en: withLang("/about", "en"), uk: withLang("/about", "ua") },
    },
  };
};

const AboutPage = async () => {
  const t = getMessages(await getLocale());

  return (
    <MainLayout>
      <h1 className="m-0 text-4xl font-semibold tracking-tight text-ink">
        {t.about}
      </h1>
    </MainLayout>
  );
};

export default AboutPage;

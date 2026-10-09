import MainLayout from "@/layouts/MainLayout";
import Case from "@/components/case/Case";
import { PORTFOLIO } from "@/constants/portfolios";
import { projectLead } from "@/lib/project";
import { notFound } from "next/navigation";
import { getMessages } from "@/constants/messages";
import { localizeProject } from "@/lib/content";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const locale = await getLocale();
  const project = PORTFOLIO.find((p) => p.id === id);

  if (!project) {
    return { title: getMessages(locale).caseStudy.notFound };
  }

  const localized = localizeProject(project, locale);
  const description = projectLead(localized);

  return {
    title: localized.title,
    description,
    alternates: {
      canonical: withLang(`/portfolio/${project.id}`, locale),
      languages: {
        en: withLang(`/portfolio/${project.id}`, "en"),
        uk: withLang(`/portfolio/${project.id}`, "ua"),
      },
    },
    openGraph: {
      title: localized.title,
      description,
      images: [{ url: project.images[0] || project.image }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = PORTFOLIO.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <MainLayout>
      <Case project={project} />
    </MainLayout>
  );
}

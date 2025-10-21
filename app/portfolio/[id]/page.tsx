import { ENavLinks } from "@/types/nav.types";
import MainLayout from "@/layouts/MainLayout";
import Case from "@/components/case/Case";
import { PORTFOLIO } from "@/constants/portfolios";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params; // <-- await here
  const project = PORTFOLIO.find((p) => p.id === id);

  if (!project) {
    return { title: "Not Found | Portfolio" };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description.join(". "),
    openGraph: {
      title: project.title,
      description: project.description.join(". "),
      images: [{ url: project.image }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = PORTFOLIO.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <MainLayout page={ENavLinks.PORTFOLIO}>
      <Case project={project} />
    </MainLayout>
  );
}

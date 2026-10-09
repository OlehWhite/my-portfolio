import { IPortfolio } from "@/types/portfolio.types";

const LABELS: Record<string, string> = {
  Next: "Next.js",
  React: "React",
  Nuxt: "Nuxt",
  Webflow: "Webflow",
};

const META =
  /^(role|роль|duration|тривалість|tech|технолог|timeline|термін|process|процес|work stages|етапи|frontend dev time|час на фронтенді|time spent|витрачено|technologies used|використані технології|based on|на основі)\b/i;
const CTA =
  /^(looking for|send me|interested in|let['’]s work|invite me|call to action|якщо шукаєте|напишіть|зацікавлені)\b|upwork/i;

export function specializationLabel(value: string) {
  return LABELS[value] ?? value;
}

function cleanLine(raw: string) {
  return raw.replace(/^[^A-Za-z0-9]+/, "").trim();
}

function isLead(text: string) {
  return (
    text.length >= 70 &&
    !META.test(text) &&
    !CTA.test(text) &&
    !/^\d+[.)]/.test(text)
  );
}

export function projectLead(project: IPortfolio) {
  const description = project.description.map(cleanLine).find(isLead);
  if (description) return description;

  const summary = project.shortDescription.map(cleanLine).find(isLead);
  if (summary) return summary;

  return [...project.description, ...project.shortDescription]
    .map(cleanLine)
    .find(Boolean) ?? "";
}

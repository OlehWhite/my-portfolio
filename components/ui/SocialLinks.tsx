import { Github, Linkedin } from "lucide-react";
import { SOCIAL_MEDIAS } from "@/constants/socials-medias";

const ICONS = {
  LinkedIn: Linkedin,
  Git: Github,
} as const;

const LABELS: Record<string, string> = {
  LinkedIn: "LinkedIn",
  Git: "GitHub",
};

interface Props {
  className?: string;
}

const SocialLinks = ({ className = "" }: Props) => {
  return (
    <ul className={`m-0 flex list-none items-center gap-2 p-0 ${className}`}>
      {SOCIAL_MEDIAS.map((item) => {
        const Icon = ICONS[item.title as keyof typeof ICONS] ?? Github;
        const label = LABELS[item.title] ?? item.title;

        return (
          <li key={item.link}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink no-underline transition-colors hover:border-ink hover:bg-card"
            >
              <Icon size={18} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;

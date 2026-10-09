import Image from "next/image";

const SHOTS = [
  {
    src: "/portfolio/27Nerds/1.jpg",
    alt: "High-End Corporate Website Development — Next.js | TypeScript",
    key: "corporate",
  },
  {
    src: "/portfolio/DamkaSestems/1.jpg",
    alt: "SaaS Multi-Platform Restaurant Management – Admin Panel",
    key: "admin",
  },
  {
    src: "/portfolio/T2D/1.jpg",
    alt: "Tap2Dine website",
    key: "tap",
  },
] as const;

interface Props {
  labels: { corporate: string; admin: string; tap: string };
}

const Frame = ({
  src,
  alt,
  label,
  caption = false,
}: {
  src: string;
  alt: string;
  label: string;
  caption?: boolean;
}) => (
  <figure className="m-0 overflow-hidden rounded-2xl border border-line bg-card shadow-[0_12px_40px_rgba(17,19,24,0.06)]">
    <div className="relative aspect-[16/10] bg-[#eef1f4]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-contain p-2"
      />
    </div>
    {caption && (
      <figcaption className="px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted">
        {label}
      </figcaption>
    )}
  </figure>
);

const HeroVisual = ({ labels }: Props) => {
  const frames = SHOTS.map((shot) => ({
    ...shot,
    label: labels[shot.key],
    alt: labels[shot.key],
  }));

  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Frame {...frames[0]} caption />
      </div>
      <Frame {...frames[1]} caption />
      <Frame {...frames[2]} caption />
    </div>
  );
};

export default HeroVisual;

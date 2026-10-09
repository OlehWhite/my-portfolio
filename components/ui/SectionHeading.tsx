import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}

const SectionHeading = ({ eyebrow, title, description, action }: Props) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {eyebrow}
          </p>
        )}
        <h2 className="m-0 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
};

export default SectionHeading;

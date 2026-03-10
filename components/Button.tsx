import { ReactNode } from "react";
import { ITemplate, TemplateKey } from "@/types/globals.types";

interface Props {
  color?: TemplateKey;
  children: ReactNode;
  href?: string;
  download?: boolean;
  onClick?: () => void;
}

const Button = ({
  href,
  color = "main",
  children,
  download,
  onClick,
}: Props) => {
  const styleTemplate: ITemplate = {
    main:
      "bg-primary border-primary text-light shadow-lg shadow-primary/25 hover:opacity-90",
    secondary:
      "bg-dark border-secondary/40 text-secondary hover:border-primary/60 hover:text-light",
  };

  return (
    <a
      onClick={onClick}
      href={href}
      download={download}
      className={`
        no-underline border-2 rounded-xl px-4 py-2.5 text-sm md:text-base font-medium
        transition-all duration-200 cursor-pointer
        ${styleTemplate[color]}
      `}
    >
      {children}
    </a>
  );
};

export default Button;

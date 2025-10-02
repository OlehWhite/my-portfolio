import { ReactNode } from "react";
import { ITemplate, TemplateKey } from "@/types/globals.types";

interface Props {
  color?: TemplateKey;
  children: ReactNode;
  href?: string;
}

const Button = ({ href, color = "main", children }: Props) => {
  const bgTemplate: ITemplate = {
    main: "bg-primary",
    secondary: "bg-light",
  };

  const textTemplate: ITemplate = {
    main: "text-light",
    secondary: "text-primary",
  };

  return (
    <a
      href={href}
      className={`
        ${bgTemplate[color]} ${textTemplate[color]} 
        no-underline
        border-0 rounded-xl px-3 py-2 text-xl transition duration-300 ease-in-out cursor-pointer
        hover:bg-blue-200 `}
    >
      {children}
    </a>
  );
};

export default Button;

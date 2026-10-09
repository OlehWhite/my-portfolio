"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/components/locale/LocaleProvider";
import { withLang } from "@/lib/locale";

interface Props {
  color?: "main" | "secondary";
  children: ReactNode;
  href?: string;
  download?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  arrow?: boolean;
  disabled?: boolean;
}

const styles = {
  main: "border border-accent bg-accent text-white hover:bg-[#1248c4]",
  secondary:
    "border border-line bg-transparent text-ink hover:border-ink hover:bg-card",
};

const Button = ({
  href,
  color = "main",
  children,
  download,
  onClick,
  className = "",
  type = "button",
  arrow = false,
  disabled = false,
}: Props) => {
  const locale = useLocale();
  const classes = `group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[color]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          size={16}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href && download) {
    return (
      <a href={href} download className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  if (href?.startsWith("/")) {
    return (
      <Link href={withLang(href, locale)} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;

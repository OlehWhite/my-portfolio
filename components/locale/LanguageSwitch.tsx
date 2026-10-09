"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { parseLocale } from "@/lib/locale";

const LanguageSwitch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = parseLocale(searchParams.get("lang"));

  const hrefFor = (locale: "en" | "ua") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", locale);
    return `${pathname}?${params.toString()}`;
  };

  const itemClass = (active: boolean) =>
    `text-sm no-underline ${active ? "font-semibold text-ink" : "text-muted hover:text-ink"}`;

  return (
    <div className="flex items-center gap-1.5" aria-label="Language">
      <Link
        href={hrefFor("en")}
        hrefLang="en"
        aria-current={current === "en" ? "true" : undefined}
        className={itemClass(current === "en")}
      >
        EN
      </Link>
      <span className="text-muted" aria-hidden>
        /
      </span>
      <Link
        href={hrefFor("ua")}
        hrefLang="uk"
        aria-current={current === "ua" ? "true" : undefined}
        className={itemClass(current === "ua")}
      >
        UA
      </Link>
    </div>
  );
};

export default LanguageSwitch;

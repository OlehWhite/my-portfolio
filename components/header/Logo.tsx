"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";

const Logo = () => {
  const locale = useLocale();
  const t = getMessages(locale);

  return (
    <Link
      href={withLang("/", locale)}
      className="flex min-w-0 items-center gap-3 no-underline"
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-[13px] font-semibold tracking-wide text-white"
        aria-hidden
      >
        OB
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold leading-tight text-ink">
          {t.siteName}
        </span>
        <span className="hidden truncate text-xs leading-tight text-muted sm:block">
          {t.role}
        </span>
      </span>
    </Link>
  );
};

export default Logo;

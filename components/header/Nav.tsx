"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_MENU } from "@/constants/nav";
import Button from "@/components/Button";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";

const Nav = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = getMessages(locale);
  const [open, setOpen] = useState(false);

  const isActive = (url: string) =>
    url === "/"
      ? pathname === "/"
      : pathname === url || pathname.startsWith(`${url}/`);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
        <ul className="m-0 flex list-none items-center gap-6 p-0">
          {NAV_MENU.map((item) => (
            <li key={item.url}>
              <Link
                href={withLang(item.url, locale)}
                aria-current={isActive(item.url) ? "page" : undefined}
                className={`text-sm no-underline transition-colors ${
                  isActive(item.url)
                    ? "font-semibold text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {t.nav[item.url as keyof typeof t.nav]}
              </Link>
            </li>
          ))}
        </ul>
        <Button href="/contact" arrow>
          {t.letsTalk}
        </Button>
      </nav>

      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-card text-ink lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? t.closeMenu : t.openMenu}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-line bg-canvas px-5 py-4 shadow-sm lg:hidden"
        >
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {NAV_MENU.map((item) => (
              <li key={item.url}>
                <Link
                  href={withLang(item.url, locale)}
                  onClick={close}
                  aria-current={isActive(item.url) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base no-underline ${
                    isActive(item.url)
                      ? "bg-accent-soft font-semibold text-ink"
                      : "text-muted hover:bg-card hover:text-ink"
                  }`}
                >
                  {t.nav[item.url as keyof typeof t.nav]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button href="/contact" arrow className="w-full" onClick={close}>
              {t.letsTalk}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;

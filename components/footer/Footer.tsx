import Link from "next/link";
import { NAV_MENU } from "@/constants/nav";
import { SITE } from "@/constants/site";
import SocialLinks from "@/components/ui/SocialLinks";
import { getMessages } from "@/constants/messages";
import { withLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";

const Footer = async () => {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="m-0 text-sm font-semibold text-ink">{t.siteName}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-muted no-underline hover:text-ink"
          >
            {SITE.email}
          </a>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
          {NAV_MENU.map((item) => (
            <li key={item.url}>
              <Link
                href={withLang(item.url, locale)}
                className="text-sm text-muted no-underline hover:text-ink"
              >
                {t.nav[item.url as keyof typeof t.nav]}
              </Link>
            </li>
          ))}
        </ul>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;

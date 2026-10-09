export type Locale = "en" | "ua";

export function parseLocale(value: string | null | undefined): Locale {
  return value === "ua" ? "ua" : "en";
}

export function htmlLang(locale: Locale) {
  return locale === "ua" ? "uk" : "en";
}

export function withLang(href: string, locale: Locale) {
  if (!href.startsWith("/")) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const [path, query] = withoutHash.split("?");
  const params = new URLSearchParams(query || "");
  params.set("lang", locale);

  return `${path}?${params.toString()}${hash}`;
}

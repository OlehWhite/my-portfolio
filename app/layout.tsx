import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { SITE } from "@/constants/site";
import { getMessages } from "@/constants/messages";
import { htmlLang } from "@/lib/locale";
import { getLocale } from "@/lib/request-locale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale());

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t.meta.homeTitle,
      template: `%s · ${t.siteName}`,
    },
    description: t.meta.homeDescription,
    openGraph: {
      title: t.meta.homeTitle,
      description: t.meta.homeDescription,
      images: [{ url: "/images/oleh-bilostotskyi.jpg" }],
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={htmlLang(locale)}>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

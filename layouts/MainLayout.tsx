import { ReactNode } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AnimationLayout from "@/layouts/AnimationLayout";
import { LocaleProvider } from "@/components/locale/LocaleProvider";
import { getLocale } from "@/lib/request-locale";

interface Props {
  children: ReactNode;
}

const MainLayout = async ({ children }: Props) => {
  const locale = await getLocale();

  return (
    <LocaleProvider locale={locale}>
      <div className="flex min-h-screen flex-col bg-canvas text-ink">
        <Header />
        <AnimationLayout>
          <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-12 md:px-8 md:py-16">
            {children}
          </main>
        </AnimationLayout>
        <Footer />
      </div>
    </LocaleProvider>
  );
};

export default MainLayout;

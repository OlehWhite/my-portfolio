import { ReactNode } from "react";
import Header from "@/components/header/Header";
import { ENavLinks } from "@/types/nav.types";
import Footer from "@/components/footer/Footer";
import AnimationLayout from "@/layouts/AnimationLayout";

interface Props {
  children: ReactNode;
  page: ENavLinks;
}

const MainLayout = ({ page, children }: Props) => {
  return (
    <AnimationLayout>
      <div className="flex flex-col gap-2 md:gap-6 overflow-hidden xl:overflow-visible bg-dark p-5 md:p-10 rounded-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] mx-5">
        <Header page={page} />
        <main>{children}</main>
        <Footer />
      </div>
    </AnimationLayout>
  );
};

export default MainLayout;

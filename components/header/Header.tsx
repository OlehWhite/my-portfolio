import { Suspense } from "react";
import Logo from "@/components/header/Logo";
import Nav from "@/components/header/Nav";
import LanguageSwitch from "@/components/locale/LanguageSwitch";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <Logo />
        <div className="flex items-center gap-3 sm:gap-5">
          <Suspense fallback={null}>
            <LanguageSwitch />
          </Suspense>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;

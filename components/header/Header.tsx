import Logo from "@/components/header/Logo";
import Nav from "@/components/header/Nav";
import { ENavLinks } from "@/types/nav.types";

interface Props {
  page: ENavLinks;
}

const Header = ({ page }: Props) => {
  return (
    <header className="flex-wrap md:flex-nowrap flex justify-between ">
      <Logo />
      <Nav page={page} />
    </header>
  );
};

export default Header;

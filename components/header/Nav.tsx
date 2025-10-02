import { NAV_MENU } from "@/constants/nav";
import Link from "next/link";
import { ENavLinks } from "@/types/nav.types";

interface Props {
  page: ENavLinks;
}

const Nav = ({ page }: Props) => {
  return (
    <nav className="flex items-center">
      <ul className="flex gap-6 list-none">
        {NAV_MENU.map((el, index) => (
          <li key={index}>
            <Link
              href={el.url}
              className={`${page === el.url ? "text-primary" : "text-light"} no-underline text-xl`}
            >
              {el.value}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

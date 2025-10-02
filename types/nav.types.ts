// enums
export enum ENavLinks {
  HOME = "/",
  ABOUT = "/about",
  SERVICES = "/services",
  PORTFOLIO = "/portfolio",
  CONTACT = "/contact",
}

export enum ENavValues {
  HOME = "Home",
  ABOUT = "About",
  SERVICES = "Services",
  PORTFOLIO = "Portfolio",
  CONTACT = "Contact",
}

// types
export type TNavLinks =
  | ENavLinks.HOME
  | ENavLinks.ABOUT
  | ENavLinks.SERVICES
  | ENavLinks.PORTFOLIO
  | ENavLinks.CONTACT;

export type TNavValues =
  | ENavValues.HOME
  | ENavValues.ABOUT
  | ENavValues.SERVICES
  | ENavValues.PORTFOLIO
  | ENavValues.CONTACT;

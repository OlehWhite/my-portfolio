import { Locale } from "@/lib/locale";
import { IPortfolio } from "@/types/portfolio.types";
import {
  CAPABILITIES,
  PROCESS,
  SERVICES,
} from "@/constants/services";
import { PORTFOLIO_UA } from "@/constants/portfolios-ua";
import {
  CAPABILITIES_UA,
  PROCESS_UA,
  SERVICES_UA,
} from "@/constants/services-ua";

export function localizeProject(project: IPortfolio, locale: Locale): IPortfolio {
  if (locale !== "ua") return project;
  const translation = PORTFOLIO_UA[project.id];
  if (!translation) return project;

  return {
    ...project,
    title: translation.title,
    shortDescription: translation.shortDescription,
    description: translation.description,
  };
}

export function getServices(locale: Locale) {
  return locale === "ua" ? SERVICES_UA : SERVICES;
}

export function getCapabilities(locale: Locale) {
  return locale === "ua" ? CAPABILITIES_UA : CAPABILITIES;
}

export function getProcess(locale: Locale) {
  return locale === "ua" ? PROCESS_UA : PROCESS;
}

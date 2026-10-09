import { headers } from "next/headers";
import { parseLocale } from "@/lib/locale";

export async function getLocale() {
  const headerStore = await headers();
  return parseLocale(headerStore.get("x-locale"));
}

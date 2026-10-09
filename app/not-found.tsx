import MainLayout from "@/layouts/MainLayout";
import Button from "@/components/Button";
import { getMessages } from "@/constants/messages";
import { getLocale } from "@/lib/request-locale";

export default async function NotFound() {
  const t = getMessages(await getLocale()).notFound;

  return (
    <MainLayout>
      <div className="flex flex-col items-start gap-4 py-10">
        <p className="m-0 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          404
        </p>
        <h1 className="m-0 text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          {t.title}
        </h1>
        <p className="m-0 text-base text-muted">{t.text}</p>
        <Button href="/">{t.home}</Button>
      </div>
    </MainLayout>
  );
}

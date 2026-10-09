"use client";

import Button from "@/components/Button";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages } from "@/constants/messages";

interface Props {
  title?: string;
  text?: string;
}

const ContactCTA = ({ title, text }: Props) => {
  const t = getMessages(useLocale());

  return (
    <section className="rounded-2xl bg-inverse px-6 py-10 text-white md:px-10 md:py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="m-0 text-3xl font-semibold tracking-tight md:text-4xl">
            {title ?? t.cta.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
            {text ?? t.cta.text}
          </p>
        </div>
        <Button href="/contact" arrow>
          {t.letsTalk}
        </Button>
      </div>
    </section>
  );
};

export default ContactCTA;

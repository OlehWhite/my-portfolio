import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";
import Image from "next/image";
import { HERO } from "@/constants/home";
import Button from "@/components/Button";
import { SOCIAL_MEDIAS } from "@/constants/socials-medias";
import Link from "next/link";

export const generateMetadata = async () => ({
  title: "Bilostotskyi Oleh - Website",
  description: `${HERO.hello} ${HERO.technologies.frontend} ${HERO.technologies.webflow}`,
  openGraph: {
    title: "Bilostotskyi Oleh - Website",
    description: `${HERO.hello} ${HERO.technologies.frontend} ${HERO.technologies.webflow}`,
    images: [{ url: "/images/oleh-bilostotskyi.jpg" }],
  },
});

const HomePage = () => {
  return (
    <MainLayout page={ENavLinks.HOME}>
      <section className="flex-wrap flex gap-6 items-center justify-center md:flex-nowrap md:justify-between">
        <div className="w-full max-w-[750px]">
          <h1 className="text-6xl mb-0">{HERO.hello}</h1>
          <h2>
            <span className="text-3xl text-primary">
              {HERO.technologies.frontend}
            </span>{" "}
            /{" "}
            <span className="text-3xl text-secondary">
              {HERO.technologies.webflow}
            </span>
          </h2>
          <p className="text-lg">{HERO.text}</p>

          <div className="flex gap-6">
            <Button href="mailto:oleg22098d@gmail.com">Let&#39;s Talk</Button>
          </div>

          <div className="flex gap-3 mt-[100px]">
            {SOCIAL_MEDIAS.map((el, index) => (
              <Link
                key={index}
                href={el.link}
                target="_blank"
                className="cursor-pointer"
              >
                <Image
                  src={el.image}
                  width={30}
                  height={30}
                  alt={el.title}
                  title={el.title}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative w-[420px] h-[500px]">
          <Image
            src="/images/oleh-bilostotskyi.jpg"
            alt="Main Logo"
            title="Main Logo"
            className="rounded-xl object-cover"
            fill
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;

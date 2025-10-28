import React from "react";
import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";

const ContactPage = () => {
  return (
    <MainLayout page={ENavLinks.CONTACT}>
      <div>
        <p className="text-xl">
          Email:{" "}
          <a href="mailto:oleg220298d@gmail.com" className="text-primary">
            oleg220298d@gmail.com
          </a>
        </p>

        <p className="text-xl">
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/oleh-bilostotskyi-a535a921b/"
            className="text-primary"
          >
            Oleh Bilostotskyi
          </a>
        </p>

        <p className="text-xl">
          CV:{" "}
          <a
            href="/files/CV_Bilostotskyi_Oleh_Front_End_React_2025.pdf"
            download
            className="text-primary underline hover:text-primary/80 transition"
          >
            Download CV
          </a>
        </p>

        <div className="w-full max-w-[600px] h-full nax-h-[400px]">
          <Image
            src="/images/logo-cv.png"
            alt="Logo CV"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;

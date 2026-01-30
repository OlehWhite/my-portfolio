import React from "react";
import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";

const ContactPage = () => {
  const document = "/files/CV_Bilostotskyi_Oleh_Front_End_React_2026.pdf";

  return (
    <MainLayout page={ENavLinks.CONTACT}>
      <div className="flex justify-between md: flex-col">
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
              href={document}
              download
              className="text-primary underline hover:text-primary/80 transition"
            >
              Download CV
            </a>
          </p>
        </div>

        <div className="w-full max-w-[900px] h-full mt-4">
          <iframe
            src={document}
            title="CV preview"
            className="w-full h-[650px] rounded-md border border-white/10"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;

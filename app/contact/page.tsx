import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";
import React from "react";

const Contact = () => {
  return (
    <MainLayout page={ENavLinks.CONTACT}>
      <p className="text-xl">
        Email:{" "}
        <a href="mailto:oleg220298d@gmail.com" className="text-primary">
          oleg220298d@gmail.com
        </a>
      </p>
    </MainLayout>
  );
};

export default Contact;

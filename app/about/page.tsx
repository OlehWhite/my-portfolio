import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";

const About = () => {
  return <MainLayout page={ENavLinks.ABOUT}>About</MainLayout>;
};

export default About;

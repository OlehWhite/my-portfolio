import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";
import { SERVICES } from "@/constants/services";
import Services from "@/components/services/Services";

export default async function ServicesPage() {
  return (
    <MainLayout page={ENavLinks.SERVICES}>
      <Services data={SERVICES} />
    </MainLayout>
  );
}

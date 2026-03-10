import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";
import { SERVICES } from "@/constants/services";
import Services from "@/components/services/Services";

export default async function ServicesPage() {
  return (
    <MainLayout page={ENavLinks.SERVICES}>
      <section className='box-border'>
        <h1 className="text-2xl md:text-4xl font-semibold text-light mb-2">
          Services
        </h1>
        
        <p className="text-secondary text-base md:text-lg mb-8">
          What I offer and how I work
        </p>

        <Services data={SERVICES} />
      </section>
    </MainLayout>
  );
}

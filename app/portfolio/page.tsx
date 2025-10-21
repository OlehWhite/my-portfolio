"use client";

import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";
import { PORTFOLIO } from "@/constants/portfolios";
import Project from "@/components/portfolio/Project";
import ReactPaginate from "react-paginate";
import AnimationLayout from "@/layouts/AnimationLayout";

const ITEMS_PER_PAGE = 5;

const PortfolioPage = () => {
  const [currentItems, setCurrentItems] = useState(
    PORTFOLIO.slice(0, ITEMS_PER_PAGE),
  );

  const handlePageClick = (event: { selected: number }) => {
    const start = event.selected * ITEMS_PER_PAGE;
    setCurrentItems(PORTFOLIO.slice(start, start + ITEMS_PER_PAGE));
  };

  return (
    <MainLayout page={ENavLinks.PORTFOLIO}>
      <div className="flex flex-col gap-10">
        {currentItems.map((project) => (
          <AnimationLayout key={project.id} delay={0.3}>
            <Project project={project} />
          </AnimationLayout>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel="..."
        pageCount={Math.ceil(PORTFOLIO.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center gap-2 mt-6 list-none p-0"
        pageClassName="px-3 py-1 border rounded cursor-pointer"
        activeClassName="bg-primary text-white"
        previousClassName="px-3 py-1 border rounded cursor-pointer"
        nextClassName="px-3 py-1 border rounded cursor-pointer"
        breakClassName="px-3 py-1"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </MainLayout>
  );
};

export default PortfolioPage;

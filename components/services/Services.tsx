"use client";
import React, { useMemo, useState } from "react";
import { IServices } from "@/types/services.types";

interface Props {
  data: IServices[];
}

const Services = ({ data }: Props) => {
  const [activeId, setActiveId] = useState<number>(0);

  const handleSelect = (id: number) => {
    setActiveId(id);
  };

  const activeService = useMemo(
    () => data.find((s) => s.id === activeId),
    [data, activeId],
  );

  return (
    <div className="p-2 md:p-6">
      <div className="flex gap-4 mb-6 flex-wrap">
        {data.map((service) => (
          <button
            key={service.id}
            onClick={() => handleSelect(service.id)}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeId === service.id
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[1000px] rounded-xl shadow-md transition-all">
        {activeService?.text.map((p, index) => (
          <p key={index} className="p-0">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Services;

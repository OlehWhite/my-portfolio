"use client";

import { IPortfolio } from "@/types/portfolio.types";
import Album from "@/components/case/Album";
import MobAlbum from "@/components/case/MobAlbum";

interface Props {
  project: IPortfolio;
}

const Case = ({ project }: Props) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col-reverse gap-6 md:items-start xl:flex-row">
        <div className="flex flex-col gap-3">
          {project.video ? (
            <video
              className={"w-full max-w-[300px] md:max-w-[650px]"}
              src={project.video}
              autoPlay
              controls
            ></video>
          ) : (
            <div className="w-[500px]" />
          )}

          <div className="flex flex-wrap gap-3">
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className="fpx-5 px-4 py-2 m-0 text-sm text-light rounded-lg bg-[#FFFFFF2F]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="m-0">{project.title}</h2>
          <div className="custom-scroll h-[330px] overflow-y-scroll">
            {project.description.map((el, index) => (
              <p key={index}>{el}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="m-0">More Images</h2>

        <MobAlbum album={project.images} />
        <Album album={project.images} />
      </div>
    </div>
  );
};

export default Case;

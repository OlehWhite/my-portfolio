import Link from "next/link";
import AnimateLogo from "@/components/portfolio/AnimateLogo";
import { IPortfolio } from "@/types/portfolio.types";

interface Props {
  project: IPortfolio;
}

const Project = ({ project }: Props) => {
  return (
    <div className="p-1 md:p-6 rounded-lg flex flex-col gap-6 duration-300 hover:bg-[#FFFFFF2C] xl:flex-row">
      <AnimateLogo project={project} />

      <div className="w-full max-w-[800px] flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          {project.link ? (
            <Link
              className="w-fit px-5 py-2 m-0 text-lg text-light rounded-lg bg-[#FFFFFF2F] duration-300 hover:bg-blue-300"
              href={project.link}
              target="_blank"
            >
              {project.title}
            </Link>
          ) : (
            <span className="w-fit px-5 py-2 m-0 text-lg text-light rounded-lg bg-[#FFFFFF2F] opacity-50 cursor-not-allowed">
              {project.title}
            </span>
          )}

          <Link
            className="w-fit px-5 py-2 m-0 text-lg text-light rounded-lg bg-[#FFFFFF2F] duration-300 hover:bg-blue-300"
            href={`/portfolio/${project.id}`}
          >
            Read More
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {project.shortDescription.map((el, index) => (
            <p key={index} className="m-0 text-sm">
              {el}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.skills.map((el, index) => (
            <p
              key={index}
              className="px-5 py-2 m-0 text-sm text-light rounded-lg bg-[#FFFFFF2F]"
            >
              {el}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;

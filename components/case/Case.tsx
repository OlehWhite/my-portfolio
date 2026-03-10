import { IPortfolio } from "@/types/portfolio.types";
import Album from "@/components/case/Album";
import MobAlbum from "@/components/case/MobAlbum";

interface Props {
  project: IPortfolio;
}

const Case = ({ project }: Props) => {
  return (
    <div className="flex flex-col gap-12">
      {/* Блок з відео та скілами — float, щоб текст обтікав */}
      <div className="overflow-hidden">
        <div className="float-none w-full max-w-[300px] md:float-left md:max-w-[420px] xl:max-w-[500px] md:mr-6 mb-6 flex flex-col gap-3 shrink-0">
          {project.video ? (
            <video
              className="w-full"
              src={project.video}
              controls
              playsInline
              preload="metadata"
              poster={project.images?.[0]}
            />
          ) : (
            <div className="w-full aspect-video rounded-lg bg-secondary/20" />
          )}

          <div className="flex flex-wrap gap-3">
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 m-0 text-sm text-light rounded-lg bg-[#FFFFFF2F]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="m-0 mb-4 text-xl md:text-2xl">{project.title}</h2>
          <div className="text-light/90 text-base md:text-lg leading-relaxed space-y-3">
            {project.description.map((el, index) => (
              <p key={index} className="m-0">
                {el}
              </p>
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

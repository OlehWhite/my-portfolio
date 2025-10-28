import Image from "next/image";

interface Props {
  album: string[];
}

const MobAlbum = ({ album }: Props) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-3 mt-6 xl:hidden">
      {album.map((picture, index) => (
        <div key={index}>
          <Image
            src={picture}
            width={600}
            height={0}
            alt={picture}
            title={picture}
            className="w-[350px] md:w-[600px] h-auto object-cover rounded-xl shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default MobAlbum;

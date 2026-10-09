"use client";

import Image from "next/image";

interface Props {
  album: string[];
  alt: string;
  onSelect?: (index: number) => void;
}

const MobAlbum = ({ album, alt, onSelect }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {album.map((picture, index) => (
        <button
          key={`${picture}-${index}`}
          type="button"
          onClick={() => onSelect?.(index)}
          aria-label={`${alt} screenshot ${index + 1}`}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-[#eef1f4] p-0"
        >
          <Image
            src={picture}
            alt={`${alt} screenshot ${index + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 560px"
            className="object-contain p-2"
          />
        </button>
      ))}
    </div>
  );
};

export default MobAlbum;

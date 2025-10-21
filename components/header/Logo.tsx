import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
      <Image
        src="/logo.png"
        alt="Main Logo"
        title="Main Logo"
        fill
        className="object-contain"
      />
    </div>
  );
};

export default Logo;

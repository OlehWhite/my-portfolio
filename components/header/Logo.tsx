import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      width={80}
      height={80}
      src="/logo.png"
      alt="Main Logo"
      title="Main Logo"
    />
  );
};

export default Logo;

import Image from "next/image";
import React from "react";

const HeroBanner = () => {
  return (
    <div className="container mx-auto">
      <Image
        alt=""
        src={"/images/hero-banner.png"}
        width={1436}
        height={768}
        className="mx-auto w-full px-10"
      />
    </div>
  );
};

export default HeroBanner;

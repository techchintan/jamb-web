"use client";

import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroBanner = () => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setSelected((prev) => (prev ? 0 : 1));
    }, 3000);
  }, [selected]);

  return (
    <div className="container sticky mx-auto top-[77px] md:top-[109px] w-full z-1">
      <div className="relative h-[calc(100dvh-157px)] md:h-[calc(100dvh-189px)]">
        <Image
          alt=""
          src={"/images/hero-banner.png"}
          width={1436}
          height={768}
          className={cn(
            "mx-auto h-full object-cover px-5 md:px-10 absolute inset-0 transition-all ease-in-out duration-500",
            {
              "opacity-100 z-1": selected === 0,
              "opacity-0 z-0": selected === 1,
            },
          )}
        />
        <Image
          alt=""
          src={"/images/fireplaces.png"}
          width={1436}
          height={768}
          className={cn(
            "mx-auto h-full object-cover px-5 md:px-10 absolute inset-0 transition-all ease-in-out duration-500",
            {
              "opacity-100 z-1": selected === 1,
              "opacity-0 z-0": selected === 0,
            },
          )}
        />
      </div>
    </div>
  );
};

export default HeroBanner;

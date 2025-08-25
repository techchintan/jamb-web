import Link from "next/link";

import type { SanityImageProps } from "@/types";

import { SanityImage } from "./elements/sanity-image";

interface LogoProps {
  image: SanityImageProps;
  alt?: string;
}

export function Logo({ alt = "logo", image }: LogoProps) {
  return (
    <Link href="/" className="">
      <SanityImage
        image={image}
        alt={alt}
        width={90}
        height={45}
        className="hover:opacity-90 transition-all duration-300"
        loading="eager"
        decoding="sync"
      />
    </Link>
  );
}

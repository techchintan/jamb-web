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
        width={108}
        height={45}
        className="dark:invert"
        loading="eager"
        decoding="sync"
      />
    </Link>
  );
}

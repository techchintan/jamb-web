import type { PagebuilderType } from "@/types";

import { NavigationBar } from "../navigation-bar";
import ImageSlides from "../elements/image-slides";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({ slides = [], links }: HeroBlockProps) {
  if (!slides || slides.length === 0) return null;

  return (
    <>
      <ImageSlides slides={slides} />
      <NavigationBar links={links} />
    </>
  );
}

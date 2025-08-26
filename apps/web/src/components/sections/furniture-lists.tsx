import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";

import type { PagebuilderType } from "@/types";

import { SanityImage } from "../elements/sanity-image";
import { RichText } from "../elements/rich-text";
import { cn } from "@workspace/ui/lib/utils";

type FurnitureListsBlockProps = PagebuilderType<"furnitureLists">;

export function FurnitureListsBlock({
  title,
  lists,
}: FurnitureListsBlockProps) {
  return (
    <div className="bg-gainsboro relative z-2">
      <div className="p-5 lg:p-10 flex flex-col gap-8 container items-center mx-auto">
        <div className="text-xl font-medium pt-8 sm:pt-0">{title}</div>
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: "center",
            slidesToScroll: 1,
          }}
        >
          <CarouselContent>
            {lists.map(({ title, richText, image, _key, aspectRatio }) => (
              <CarouselItem
                key={_key}
                className="min-w-0 shrink-0 grow-0 basis-full p-0 select-none  sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
              >
                <div
                  key={_key}
                  className="flex flex-col gap-3 items-center h-full ml-4 lg:ml-9"
                >
                  <SanityImage
                    image={image}
                    width={333}
                    height={244}
                    className={cn(
                      "flex-1 aspect-auto object-contain hover:opacity-80 transition-opacity duration-300",
                      aspectRatio === "strict" && "aspect-square object-cover",
                      aspectRatio === "free" && "aspect-video object-contain",
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-base font-semibold text-gun-powder line-clamp-1">
                      {title}
                    </div>
                    <RichText
                      richText={richText}
                      className="text-xs sm:text-sm line-clamp-3 text-gun-powder/80 h-[80px] sm:h-[92px]"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";

import type { PagebuilderType } from "@/types";

import { SanityImage } from "../elements/sanity-image";

type FurnitureListsBlockProps = PagebuilderType<"furnitureLists">;

export function FurnitureListsBlock({
  title,
  lists,
}: FurnitureListsBlockProps) {
  return (
    <div className="bg-[#E3E3E3] relative z-2">
      <div className="p-5 lg:p-10 flex flex-col gap-8 container items-center mx-auto">
        <div className="text-xl font-medium">{title}</div>
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent>
            {lists.map(({ title, subTitle, image, _key }) => (
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
                    className="flex-1 object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="flex flex-col items-center">
                    <div className="text-base font-semibold text-[#737373] line-clamp-1">
                      {title}
                    </div>
                    <div className="text-base text-[#737373] line-clamp-2">
                      {subTitle}
                    </div>
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

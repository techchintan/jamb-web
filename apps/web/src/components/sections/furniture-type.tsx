import { cn } from "@workspace/ui/lib/utils";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";
import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";

type FurnitureTypeBlockProps = PagebuilderType<"furnitureType">;

export function FurnitureTypeBlock({
  prefix,
  title,
  richText,
  image,
  buttons,
}: FurnitureTypeBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#F3F0ED] sticky top-[calc(100dvh-77px-100%)] md:top-[calc(100dvh-109px-100%)] z-1",
      )}
    >
      <div
        className="px-5 lg:px-28 container grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[151px] items-center mx-auto py-19"
        id={(prefix || title).toLocaleLowerCase()}
      >
        <div className="flex flex-col items-center gap-6">
          {prefix && (
            <div className="text-base capitalize font-medium">{prefix}</div>
          )}
          <h2 className="font-medium text-4xl text-center">{title}</h2>
          <RichText
            richText={richText}
            className="text-base md:text-lg font-normal"
          />
          <SanityButtons
            buttons={buttons}
            buttonClassName="w-full sm:w-fit"
            className="flex !flex-col gap-3 items-center w-full"
          />
        </div>
        {image && (
          <SanityImage
            alt="section-image"
            image={image}
            width={583}
            height={734}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
}

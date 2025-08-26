import type { PagebuilderType } from "@/types";

import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type FurnitureTypeBlockProps = PagebuilderType<"furnitureType">;

export function FurnitureTypeBlock({
  prefix,
  title,
  richText,
  image,
  buttons,
  bgColor,
}: FurnitureTypeBlockProps) {
  return (
    <div
      className="sticky z-1 panel"
      style={{
        backgroundColor: bgColor ? bgColor.hex : "#F3F0ED",
      }}
      id={(prefix || title).toLocaleLowerCase()}
    >
      <div className="px-5 lg:px-28 container grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[151px] items-center mx-auto py-19">
        <div className="flex flex-col items-center gap-6">
          {prefix && (
            <div className="text-base font-medium uppercase">{prefix}</div>
          )}
          <h2 className="font-medium text-4xl text-center text-balance">{title}</h2>
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

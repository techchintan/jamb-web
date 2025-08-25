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
  function getAspectRatio(image: any) {
    if (
      image &&
      image.asset &&
      typeof image.asset.metadata === "object" &&
      image.asset.metadata.dimensions
    ) {
      const { width, height } = image.asset.metadata.dimensions;
      if (width && height) {
        return `${width} / ${height}`;
      }
    }
    return undefined;
  }

  const aspectRatio = getAspectRatio(image);

  function getNaturalWidth(image: any, fallback: number) {
    if (
      image &&
      image.asset &&
      typeof image.asset.metadata === "object" &&
      image.asset.metadata.dimensions &&
      image.asset.metadata.dimensions.width
    ) {
      return image.asset.metadata.dimensions.width;
    }
    return fallback;
  }
  function getNaturalHeight(image: any, fallback: number) {
    if (
      image &&
      image.asset &&
      typeof image.asset.metadata === "object" &&
      image.asset.metadata.dimensions &&
      image.asset.metadata.dimensions.height
    ) {
      return image.asset.metadata.dimensions.height;
    }
    return fallback;
  }

  const naturalWidth = getNaturalWidth(image, 583);
  const naturalHeight = getNaturalHeight(image, 734);

  return (
    <div
      className="sticky top-[calc(100dvh-137.5px-100%)] z-1 panel"
      style={{
        backgroundColor: bgColor ? bgColor.hex : "#F3F0ED",
      }}
      id={(prefix || title).toLocaleLowerCase()}
    >
      <div
        className="px-5 lg:px-28 container grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[151px] items-center mx-auto py-19"
      >
        <div className="flex flex-col items-center gap-6">
          {prefix && (
            <div className="text-base font-medium uppercase">{prefix}</div>
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
          <div
            style={
              aspectRatio ? { aspectRatio, width: "100%" } : { width: "100%" }
            }
            className="flex items-center justify-center"
          >
            <SanityImage
              image={image}
              width={naturalWidth}
              height={naturalHeight}
              className="w-full h-auto"
              style={aspectRatio ? { aspectRatio } : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}

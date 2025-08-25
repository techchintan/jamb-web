/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import type { ImageResponseOptions } from "next/server";

import type { Maybe } from "@/types";

import { getOgMetaData } from "./og-config";
import {
  getGenericPageOGData,
  getHomePageOGData,
  getSlugPageOGData,
} from "./og-data";

export const runtime = "edge";

const errorContent = (
  <div tw="flex flex-col w-full h-full items-center justify-center">
    <div tw=" flex w-full h-full items-center justify-center ">
      <h1 tw="text-white">Something went Wrong with image generation</h1>
    </div>
  </div>
);

type SeoImageRenderProps = {
  seoImage: string;
};

type ContentProps = Record<string, string>;

type DominantColorSeoImageRenderProps = {
  image?: Maybe<string>;
  title?: Maybe<string>;
  logo?: Maybe<string>;
  dominantColor?: Maybe<string>;
  description?: Maybe<string>;
  seoImage?: Maybe<string>;
};

const seoImageRender = ({ seoImage }: SeoImageRenderProps) => {
  return (
    <div tw="flex flex-col w-full h-full items-center justify-center">
      <img src={seoImage} alt="SEO preview" width={1200} height={630} />
    </div>
  );
};

const dominantColorSeoImageRender = ({
  title,
  logo,
  dominantColor,
  description,
  seoImage,
}: DominantColorSeoImageRenderProps) => {
  const fallbackColor = "#F3F0ED";
  const mainColor = dominantColor ?? fallbackColor;
  const gradient = `linear-gradient(135deg, ${mainColor} 0%, #E3E3E3 50%, #9C9C9D 100%)`;

  return (
    <div
      tw="flex flex-row overflow-hidden relative w-full"
      style={{
        fontFamily: "Inter",
        background: gradient,
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="radial" cx="70%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#radial)" />
      </svg>

      <div tw="flex-1 p-10 flex flex-col justify-between relative z-10">
        <div tw="flex justify-between items-start w-full">
          {logo && <img src={logo} alt="Logo" height={48} />}
        </div>

        <h1 tw="text-5xl font-bold leading-tight max-w-[90%] text-black">
          {title}
        </h1>
        {description && <p tw="text-lg text-black/80">{description}</p>}
        <div
          tw={`bg-black text-[${mainColor}] flex px-5 py-2 rounded-none text-base font-semibold self-start`}
        >
          Visit Website
        </div>
      </div>

      <div tw="w-[630px] h-[630px] flex items-center justify-center p-8 relative z-10">
        <div tw="w-[566px] h-[566px] bg-white bg-opacity-20 flex flex-col justify-center items-center rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03),0_4px_6px_-1px_rgba(0,0,0,0.05),0_8px_10px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
          <div tw="flex relative w-full h-full">
            {seoImage ? (
              <img
                src={seoImage}
                tw="w-full h-full rounded-3xl shadow-2xl"
                width={566}
                height={566}
                alt="Content preview"
                style={{
                  objectFit: "cover",
                }}
              />
            ) : logo ? (
              <div tw="flex items-center justify-center h-full w-full">
                <img src={logo} alt="Logo" width={400} height={400} />
              </div>
            ) : (
              <div tw="flex items-center justify-center h-full w-full">
                <img
                  src={"https://picsum.photos/566/566"}
                  alt="Logo"
                  width={400}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

async function getTtfFont(
  family: string,
  axes: string[],
  value: number[],
): Promise<ArrayBuffer> {
  const familyParam = `${axes.join(",")}@${value.join(",")}`;

  // Get css style sheet with user agent Mozilla/5.0 Firefox/1.0 to ensure non-variable TTF is returned
  const cssCall = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Firefox/1.0",
      },
    },
  );

  const css = await cssCall.text();
  const ttfUrl = css.match(/url\(([^)]+)\)/)?.[1];

  if (!ttfUrl) {
    throw new Error("Failed to extract font URL from CSS");
  }

  return await fetch(ttfUrl).then((res) => res.arrayBuffer());
}

const getOptions = async ({
  width,
  height,
}: {
  width: number;
  height: number;
}): Promise<ImageResponseOptions> => {
  const [interRegular, interBold, interSemiBold] = await Promise.all([
    getTtfFont("Inter", ["wght"], [400]),
    getTtfFont("Inter", ["wght"], [700]),
    getTtfFont("Inter", ["wght"], [600]),
  ]);
  return {
    width,
    height,
    fonts: [
      {
        name: "Inter",
        data: interRegular,
        style: "normal",
        weight: 400,
      },
      {
        name: "Inter",
        data: interBold,
        style: "normal",
        weight: 700,
      },
      {
        name: "Inter",
        data: interSemiBold,
        style: "normal",
        weight: 600,
      },
    ],
  };
};

const getHomePageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getHomePageOGData(id);
  if (err || !result) return undefined;
  // if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};
const getSlugPageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getSlugPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const getGenericPageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getGenericPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const block = {
  homePage: getHomePageContent,
  page: getSlugPageContent,
} as const;

export async function GET({ url }: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(url);
  const type = searchParams.get("type") as keyof typeof block;
  const { width, height } = getOgMetaData(searchParams);
  const para = Object.fromEntries(searchParams.entries());
  const options = await getOptions({ width, height });
  const image = block[type] ?? getGenericPageContent;
  try {
    const content = await image(para);
    return new ImageResponse(content ? content : errorContent, options);
  } catch (err) {
    console.log({ err });
    return new ImageResponse(errorContent, options);
  }
}

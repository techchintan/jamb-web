"use client";

import { PagebuilderType } from "@/types";
import { cn } from "@workspace/ui/lib/utils";
import React, { useEffect, useRef, useState } from "react";

import { SanityImage } from "./sanity-image";

type ImageSlidesProps = {
  slides: PagebuilderType<"hero">["slides"];
};

export default function ImageSlides({ slides }: ImageSlidesProps) {
  const [selected, setSelected] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getLoading = (idx: number) => (idx === 0 ? "eager" : "lazy");

  useEffect(() => {
    setSelected(0);
  }, [slides]);

  useEffect(() => {
    if (!slides || slides.length < 2) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSelected((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides]);

  const width = 1600;
  const height = 900;

  return (
    <section
      className="container sticky mx-auto top-[69.5px] w-full z-1 md:px-10 px-5"
      aria-label="Image Slides"
    >
      <div className="relative w-full h-[calc(100dvh-137px)]">
        <div className="w-full h-full aspect-video relative">
          {slides.map((slide, idx) => {
            const isActive = selected === idx;

            return (
              <SanityImage
                key={slide._key || idx}
                image={slide}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading={getLoading(idx)}
                fetchPriority={idx === 0 ? "high" : "auto"}
                width={width}
                height={height}
                className={cn(
                  "mx-auto h-full object-contain inset-0 transition-opacity duration-500 absolute w-full top-0 left-0",
                  {
                    "opacity-100 pointer-events-auto z-10 visible": isActive,
                    "opacity-0 pointer-events-none z-0 hidden": !isActive,
                  },
                )}
                aria-hidden={!isActive}
                tabIndex={-1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef, useState } from "react";

import type { PagebuilderType } from "@/types";

import { SanityImage } from "../elements/sanity-image";
import { NavigationBar } from "../navigation-bar";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({ slides = [], links }: HeroBlockProps) {
  const [selected, setSelected] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getLoading = (idx: number) => {
    if (idx === 0) return "eager";
    if (idx === 1) return "lazy";
    return undefined;
  };

  useEffect(() => {
    setSelected(0);
  }, [slides]);

  useEffect(() => {
    if (!slides || slides.length < 2) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSelected((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  return (
    <>
      <section className="container sticky mx-auto top-20 w-full z-1 md:px-10 px-5">
        <div className={cn("relative w-full h-[calc(100dvh-130px)]")}>
          <div className="w-full h-full aspect-video relative">
            {slides.map((slide, idx) => {
              const isActive = selected === idx;
              const isNext =
                slides.length > 1 && (selected + 1) % slides.length === idx;
              if (!isActive && !isNext) return null;

              const width = 1600;
              const height = 900;

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
                    "mx-auto h-full object-contain inset-0 transition-all ease-in-out duration-500 absolute w-full",
                    {
                      "opacity-100 pointer-events-auto z-10": isActive,
                      "opacity-0 pointer-events-none z-0": !isActive,
                    },
                  )}
                  style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>
      <NavigationBar links={links} />
    </>
  );
}

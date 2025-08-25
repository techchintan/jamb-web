"use client";

import { useEffect } from "react";

export function SectionHeight() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = document.querySelectorAll(".panel");
    sections.forEach((section) => {
      (section as HTMLElement).setAttribute(
        "data-section-height",
        (section as HTMLElement).offsetTop.toString(),
      );
    });

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target as HTMLElement;
        section.setAttribute(
          "data-section-height",
          section.offsetTop.toString(),
        );
      });
    });

    sections.forEach((section) => {
      resizeObserver.observe(section as HTMLElement);
    });

    return () => {
      sections.forEach((section) => {
        resizeObserver.unobserve(section as HTMLElement);
      });
    };
  }, []);


  return null;
}

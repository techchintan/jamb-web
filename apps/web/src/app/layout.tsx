import "@workspace/ui/globals.css";

import { Suspense } from "react";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

import { SectionHeight } from "@/components/elements/section-height";
import { FooterServer, FooterSkeleton } from "@/components/footer";
import { CombinedJsonLd } from "@/components/json-ld";
import { NavbarServer, NavbarSkeleton } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { SanityLive } from "@/lib/sanity/live";
import { cn } from "@workspace/ui/lib/utils";

const glxcs = localFont({
  src: [
    {
      path: "./fonts/Copernicus-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Copernicus-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Copernicus-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Copernicus-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Copernicus-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-glxcs",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-UK" className="scroll-smooth ">
      <body
        className={cn(glxcs.variable, "font-glxcs antialiased bg-hint-of-red")}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <Suspense fallback={<NavbarSkeleton />}>
          <NavbarServer />
        </Suspense>
        <main id="main-content">{children}</main>
        <Suspense fallback={<FooterSkeleton />}>
          <FooterServer />
        </Suspense>
        <Suspense fallback={null}>
          <SectionHeight />
        </Suspense>
        <SanityLive />
        <CombinedJsonLd includeWebsite includeOrganization />
        {(await draftMode()).isEnabled && (
          <>
            <PreviewBar />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}

import "@workspace/ui/globals.css";

import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Suspense } from "react";

import { FooterServer, FooterSkeleton } from "@/components/footer";
import { CombinedJsonLd } from "@/components/json-ld";
import { NavbarServer, NavbarSkeleton } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";
import { SanityLive } from "@/lib/sanity/live";

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
    <html
      lang="en-UK"
      suppressHydrationWarning
      className="scroll-smooth scroll-pt-[77px] md:scroll-pt-[109px]"
    >
      <body className={`${glxcs.variable} font-glxcs antialiased bg-hint-of-red`}>
        <Providers>
          <Suspense fallback={<NavbarSkeleton />}>
            <NavbarServer />
          </Suspense>
          {children}
          <Suspense fallback={<FooterSkeleton />}>
            <FooterServer />
          </Suspense>
          <SanityLive />
          <CombinedJsonLd includeWebsite includeOrganization />
          {(await draftMode()).isEnabled && (
            <>
              <PreviewBar />
              <VisualEditing />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}

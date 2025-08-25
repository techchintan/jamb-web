import { sanityFetch } from "@/lib/sanity/live";
import {
  queryFooterData,
  queryGlobalSeoSettings,
  queryNavbarData,
} from "@/lib/sanity/query";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";

export async function NavbarServer() {
  const [navbarData, settingsData, footerData] = await Promise.all([
    sanityFetch({ query: queryNavbarData }),
    sanityFetch({ query: queryGlobalSeoSettings }),
    sanityFetch({
      query: queryFooterData,
    }),
  ]);
  return (
    <Navbar
      navbarData={navbarData.data}
      settingsData={settingsData.data}
      footerData={footerData.data}
    />
  );
}

export function Navbar({
  navbarData,
  settingsData,
  footerData,
}: {
  navbarData: QueryNavbarDataResult;
  settingsData: QueryGlobalSeoSettingsResult;
  footerData: QueryFooterDataResult;
}) {
  const { siteTitle: settingsSiteTitle, logo } = settingsData ?? {};

  return (
    <header className="sticky top-0 bg-hint-of-red z-10">
      <div className="container mx-auto md:px-10 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          {logo && <Logo alt={settingsSiteTitle} image={logo} />}
          <NavbarClient settingsData={settingsData} navbarData={navbarData} footerData={footerData} />
        </div>
      </div>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="h-[75px] py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="h-[40px] w-[170px] rounded animate-pulse bg-muted" />
          <NavbarSkeletonResponsive />
        </div>
      </div>
    </header>
  );
}

"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Mail, Menu, Search } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type {
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";

function MobileNavbar({
  settingsData,
  navbarData,
}: {
  settingsData: QueryGlobalSeoSettingsResult;
  navbarData: QueryNavbarDataResult;
}) {
  const path = usePathname();
  const { siteTitle, logo } = settingsData ?? {};
  const { columns } = navbarData ?? {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end">
        <SheetTrigger asChild>
          <div className="cursor-pointer">
            <Menu className="text-gun-powder" />
            <span className="sr-only">Open menu</span>
          </div>
        </SheetTrigger>
      </div>
      <SheetContent className="overflow-y-auto px-10 py-8 gap-10">
        <SheetHeader>
          <SheetTitle>
            {logo && <Logo alt={siteTitle} image={logo} />}
          </SheetTitle>
        </SheetHeader>
        <NavigationMenu
          viewport={false}
          className="max-w-full items-start justify-start"
        >
          <NavigationMenuList className="w-full flex-col gap-6">
            {columns?.map((tab, index) => (
              <NavigationMenuItem
                className="w-full"
                key={index}
                onClick={() => setIsOpen(false)}
              >
                <NavigationMenuLink
                  asChild
                  className="w-full items-start text-xl font-medium hover:text-gun-powder/50 transition-all duration-300 hover:bg-transparent"
                >
                  <Link
                    target={tab.openInNewTab ? "_blank" : "_self"}
                    href={tab.href ?? "#"}
                    aria-label={tab.name ?? "Navigation link"}
                    className="!p-0"
                  >
                    {tab.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

const ClientSideNavbar = ({
  settingsData,
  navbarData,
}: {
  settingsData: QueryGlobalSeoSettingsResult;
  navbarData: QueryNavbarDataResult;
}) => {
  return (
    <div className="flex gap-7 items-center">
      <Search className="text-gun-powder" />
      <Link href="mailto:example@example.com" aria-label="Send email">
        <Mail className="text-gun-powder" />
      </Link>
      <MobileNavbar settingsData={settingsData} navbarData={navbarData} />
    </div>
  );
};

function SkeletonMobileNavbar() {
  return (
    <div className="md:hidden">
      <div className="flex justify-end">
        <div className="h-12 w-12 rounded-md bg-muted animate-pulse" />
      </div>
    </div>
  );
}

function SkeletonDesktopNavbar() {
  return (
    <div className="hidden md:grid grid-cols-[1fr_auto] items-center gap-8 w-full">
      <div className="justify-center flex max-w-max flex-1 items-center gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={`nav-item-skeleton-${index.toString()}`}
            className="h-12 w-32 rounded bg-muted animate-pulse"
          />
        ))}
      </div>

      <div className="justify-self-end">
        <div className="flex items-center gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`nav-button-skeleton-${index.toString()}`}
              className="h-12 w-32 rounded-[10px] bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function NavbarSkeletonResponsive() {
  return (
    <>
      <SkeletonMobileNavbar />
      <SkeletonDesktopNavbar />
    </>
  );
}

// Dynamically import the navbar with no SSR to avoid hydration issues
export const NavbarClient = dynamic(() => Promise.resolve(ClientSideNavbar), {
  ssr: false,
  loading: () => <NavbarSkeletonResponsive />,
});

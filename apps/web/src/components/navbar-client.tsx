"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";
import { Mail, Menu, Search } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { QueryGlobalSeoSettingsResult } from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";

function MobileNavbar({
  settingsData,
}: {
  settingsData: QueryGlobalSeoSettingsResult;
}) {
  const { siteTitle, logo } = settingsData ?? {};
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end">
        <SheetTrigger asChild>
          <div className="cursor-pointer">
            <Menu color="#9C9C9D" />
            <span className="sr-only">Open menu</span>
          </div>
        </SheetTrigger>
      </div>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {logo && (
              <div className="max-w-[50px]">
                <Logo alt={siteTitle} image={logo} />
              </div>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="my-8 flex flex-col gap-4 mx-4">
          <NavigationMenu viewport={false} className="max-w-full">
            <div className="w-full">
              <NavigationMenuList className="w-full flex-col">
                {["Fireplaces", "Lighting ", "Furniture", "Journal"].map(
                  (tab, index) => (
                    <NavigationMenuItem
                      className="w-full"
                      key={index}
                      onClick={() => setIsOpen(false)}
                    >
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "w-full items-start text-base",
                        )}
                      >
                        <Link href={`#${tab.toLocaleLowerCase()}`}>{tab}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </div>
          </NavigationMenu>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ClientSideNavbar = ({
  settingsData,
}: {
  settingsData: QueryGlobalSeoSettingsResult;
}) => {
  return (
    <div className="flex gap-7 items-center">
      <Search color="#9C9C9D" />
      <Link href="mailto:example@example.com">
        <Mail color="#9C9C9D" />
      </Link>
      <MobileNavbar settingsData={settingsData} />
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

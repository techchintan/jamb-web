"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
} from "@workspace/ui/components/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Mail, Menu, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@/lib/sanity/sanity.types";

function MobileNavbar({
  settingsData,
  navbarData,
  footerData,
}: {
  settingsData: QueryGlobalSeoSettingsResult;
  navbarData: QueryNavbarDataResult;
  footerData: QueryFooterDataResult;
}) {
  const path = usePathname();
  const { contactPhone, contactEmail, contactAddress } = settingsData ?? {};
  const { columns } = navbarData ?? {};
  const footerlinks = footerData?.columns ?? [];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end">
        <SheetTrigger asChild>
          <button
            type="button"
            className="cursor-pointer flex items-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="text-gun-powder hover:text-dim-gray transition-all duration-300" />
            ) : (
              <Menu className="text-gun-powder hover:text-dim-gray transition-all duration-300" />
            )}
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
          </button>
        </SheetTrigger>
      </div>
      <SheetContent
        className="overflow-y-auto border-t-0 border-0 focus-visible:outline-none h-[calc(100dvh-69.5px)] bg-gainsboro"
        side="bottom"
      >
        <div className="container mx-auto px-10 py-8 h-full">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <NavigationMenu className="items-start justify-start max-w-[405px] w-full">
              <div className="flex flex-col divide-y divide-santas-grey w-full">
                {columns?.map((tab, index) => (
                  <div
                    className="w-full py-6"
                    key={index}
                    onClick={() => setIsOpen(false)}
                  >
                    <NavigationMenuLink
                      key={index}
                      className="w-full items-start text-3xl font-medium hover:text-black text-santas-grey/50 transition-all duration-300 hover:bg-transparent p-0"
                      target={tab.openInNewTab ? "_blank" : "_self"}
                      href={tab.href ?? "#"}
                    >
                      {tab.name}
                    </NavigationMenuLink>
                  </div>
                ))}
              </div>
            </NavigationMenu>
            <div className="flex gap-4 flex-col sm:flex-row text-base text-santas-grey">
              <div className="flex flex-col line-clamp-1 max-w-[405px] sm:max-w-[222px] w-full">
                <div className="w-full h-[1px] bg-santas-grey mb-6" />
                <div className="flex flex-col gap-2">
                  {footerlinks.length &&
                    (footerlinks[footerlinks.length - 1]?.links ?? []).map(
                      (item, linkIdx: number) => (
                        <Link
                          key={item._key || linkIdx}
                          href={item.href || "#"}
                          className="w-fit line-clamp-1"
                        >
                          <p className="line-clamp-1">{item.name}</p>
                        </Link>
                      ),
                    )}
                </div>
              </div>
              <div className="flex flex-col max-w-[405px] sm:max-w-[222px] w-full">
                <div className="w-full h-[1px] bg-santas-grey mb-6" />
                <div className="flex flex-col gap-2">
                  <p>Tel: {contactPhone}</p>
                  <p>{contactAddress}</p>
                  <Link
                    href={"mailto:hello@jamb.co.uk"}
                    className="text-base text-santas-grey w-fit"
                  >
                    {contactEmail}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ClientSideNavbar = ({
  settingsData,
  navbarData,
  footerData,
}: {
  settingsData: QueryGlobalSeoSettingsResult;
  navbarData: QueryNavbarDataResult;
  footerData: QueryFooterDataResult;
}) => {
  return (
    <div className="flex gap-7 items-center">
      <Search className="text-gun-powder hover:text-dim-gray transition-all duration-300" />
      <Link href="mailto:example@example.com" aria-label="Send email">
        <Mail className="text-gun-powder hover:text-dim-gray transition-all duration-300" />
      </Link>
      <MobileNavbar
        settingsData={settingsData}
        navbarData={navbarData}
        footerData={footerData}
      />
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

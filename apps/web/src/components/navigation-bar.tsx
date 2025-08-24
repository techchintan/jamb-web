import Link from "next/link";

import type { PagebuilderType } from "@/types";

type NavigationBarProps = {
  links?: PagebuilderType<"hero">["links"];
};

export const NavigationBar = ({ links }: NavigationBarProps) => {
  if (!links || links.length === 0) return null;

  return (
    <nav
      className="sticky top-16 z-20 flex items-center gap-2 py-6 w-full justify-center mx-auto bg-hint-of-red transition-all duration-300"
      aria-label="Section navigation"
    >
      {links.map((link, idx) => {
        const isLast = idx === links.length - 1;
        return (
          <span key={link._key ?? idx} className="flex items-center">
            <Link
              href={link.url?.section ?? "#"}
              className="font-medium text-sm text-[#9C9C9D] hover:text-[#9C9C9D]/50 transition-all duration-300"
            >
              {link.name}
            </Link>
            {!isLast && (
              <span
                className="w-[1px] h-4 bg-[#9C9C9D] mx-2"
                aria-hidden="true"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
};

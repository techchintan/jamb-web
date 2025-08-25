import type { PagebuilderType } from "@/types";
import { scrollToTargetAdjusted } from "@/utils";

type NavigationBarProps = {
  links?: PagebuilderType<"hero">["links"];
};

export const NavigationBar = ({ links }: NavigationBarProps) => {
  if (!links || links.length === 0) return null;

  console.log(links);

  return (
    <nav
      className="sticky top-[69.5px] z-20 flex items-center py-6 w-full justify-center mx-auto bg-hint-of-red transition-all duration-300"
      aria-label="Section navigation"
      role="navigation"
    >
      {links.map((link, idx) => {
        const isLast = idx === links.length - 1;
        return (
          <span key={link._key ?? idx} className="flex items-center">
            <p
              onClick={() => scrollToTargetAdjusted(link.href ?? "#")}
              aria-label={link.name ?? "Navigation link"}
              className="font-medium text-sm text-gun-powder hover:text-dim-gray transition-all duration-300 cursor-pointer"
            >
              {link.name}
            </p>
            {!isLast && (
              <span
                className="w-[1px] h-4 bg-gun-powder mx-2"
                aria-hidden="true"
                role="presentation"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
};

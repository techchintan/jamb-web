import { PagebuilderType } from "@/types";
import Link from "next/link";
import { Fragment } from "react";

type TabListProps = {
  links?: PagebuilderType<"hero">["links"];
};

const TabList = ({ links }: TabListProps) => {
  if (!links) return null;

  return (
    <div className="flex items-center gap-2 pt-7 justify-center container mx-auto bg-[#F3F0ED] relative z-1">
      {links.map((tab, index) => (
        <Fragment key={index}>
          <Link
            href={tab.url?.section ?? "#"}
            className="font-medium text-sm sm:text-base text-[#9C9C9D]"
          >
            {tab.name}
          </Link>
          {index < links.length - 1 && (
            <div className="w-[1px] h-4 bg-[#9C9C9D]" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TabList;

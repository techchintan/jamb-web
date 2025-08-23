import Link from "next/link";
import { Fragment } from "react";

const TabList = () => {
  const tablist = ["Fireplaces", "Lighting ", "Furniture", "Journal"];
  return (
    <div className="flex items-center gap-2 pt-7 justify-center container mx-auto bg-[#F3F0ED]">
      {tablist.map((tab, index) => (
        <Fragment key={index}>
          <Link
            href={`#${tab.toLocaleLowerCase()}`}
            className="font-medium text-sm sm:text-base text-[#9C9C9D]"
          >
            {tab}
          </Link>
          {index < tablist.length - 1 && (
            <div className="w-[1px] h-4 bg-[#9C9C9D]" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TabList;

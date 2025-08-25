import Link from "next/link";
import { Fragment } from "react";

const TabList = () => {
  const tablist = ["Fireplaces", "Lighting ", "Furniture", "Journal"];

  return (
    <div className="flex items-center gap-2 pt-7 justify-center container mx-auto bg-hint-of-red relative z-1">
      {tablist.map((tab, index) => (
        <Fragment key={index}>
          <Link
            href={`#${tab.toLocaleLowerCase()}`}
            aria-label={tab}
            className="font-medium text-sm sm:text-base text-gun-powder"
          >
            {tab}
          </Link>
          {index < tablist.length - 1 && (
            <div className="w-[1px] h-4 bg-gun-powder" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TabList;

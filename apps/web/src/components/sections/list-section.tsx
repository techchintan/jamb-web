import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import React from "react";
type props = {
  title: string;
  className?: string;
  list: {
    image: string;
    title: string;
    subTitle: string;
  }[];
};
const ListSection = ({ title, list, className = "" }: props) => {
  return (
    <div className="bg-[#E3E3E3]">
      <div className="p-10 flex flex-col gap-8 container items-center mx-auto">
        <div className="text-xl font-medium">{title}</div>
        <div className={cn("grid grid-cols-4 gap-9", className)}>
          {list.map(({ image, subTitle, title }, index) => (
            <div key={index} className="flex flex-col gap-3 items-center">
              <Image
                alt="card-image"
                src={image}
                width={333}
                height={244}
                className="flex-1 w-full object-contain"
              />
              <div className="flex flex-col items-center">
                <div className="text-base font-semibold text-[#737373]">
                  {title}
                </div>
                <div className="text-base font-medium text-[#737373]">
                  {subTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListSection;

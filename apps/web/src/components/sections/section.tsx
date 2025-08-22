import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

type props = {
  image: string;
  title: string;
  desc: string;
  buttonList: { label: string; onClick?: () => void }[];
  className?: string;
  heading?: string;
};

const Section = ({
  image,
  title,
  desc,
  buttonList,
  className = "",
  heading,
}: props) => {
  return (
    <div className={cn("py-19 bg-[#F3F0ED]", className)}>
      <div
        className="px-[132px] container grid grid-cols-2 gap-[151px] items-center mx-auto"
        id={title.toLocaleLowerCase()}
      >
        <div className="flex flex-col items-center gap-6">
          {heading && (
            <div className="text-base capitalize font-medium">{heading}</div>
          )}
          <h2 className="font-medium text-4xl text-center">{title}</h2>
          <div className="text-base ">{desc}</div>
          <div className="flex flex-col gap-3 items-center">
            {buttonList.map(({ label, onClick }, index) => (
              <Button key={index} variant={"outline"} onClick={onClick}>
                {label}
              </Button>
            ))}
          </div>
        </div>
        <Image alt="section-image" src={image} width={583} height={734} />
      </div>
    </div>
  );
};

export default Section;

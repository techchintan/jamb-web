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
    <div
      className={cn(
        "py-19 bg-[#F3F0ED] sticky top-[calc(100dvh-77px-100%)] md:top-[calc(100dvh-109px-100%)] z-1 scroll-maintain",
        className,
      )}
    >
      <div
        className="px-5 lg:px-[132px] container grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[151px] items-center mx-auto"
        id={(heading || title).toLocaleLowerCase()}
      >
        <div className="flex flex-col items-center gap-6">
          {heading && (
            <div className="text-base capitalize font-medium">{heading}</div>
          )}
          <h2 className="font-medium text-4xl text-center">{title}</h2>
          <div className="text-base ">{desc}</div>
          <div className="flex flex-col gap-3 items-center w-full">
            {buttonList.map(({ label, onClick }, index) => (
              <Button
                key={index}
                variant={"outline"}
                onClick={onClick}
                className="w-full sm:w-fit"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <Image
          alt="section-image"
          src={image}
          width={583}
          height={734}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Section;

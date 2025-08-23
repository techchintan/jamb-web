import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import Image from "next/image";
type props = {
  title: string;
  list: {
    image: string;
    title: string;
    subTitle: string;
  }[];
};
const ListSection = ({ title, list }: props) => {
  return (
    <div className="bg-[#E3E3E3] relative z-2">
      <div className="p-5 lg:p-10 flex flex-col gap-8 container items-center mx-auto">
        <div className="text-xl font-medium">{title}</div>
        <Carousel
        className="w-full"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent className="">
            {list.map(({ image, subTitle, title }, index) => (
              <CarouselItem
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full p-0 select-none  sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
              >
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center h-full ml-4 lg:ml-9"
                >
                  <Image
                    alt="card-image"
                    src={image}
                    width={333}
                    height={244}
                    className="flex-1 object-contain"
                  />
                  <div className="flex flex-col items-center">
                    <div className="text-base font-semibold text-[#737373] line-clamp-1">
                      {title}
                    </div>
                    <div className="text-base text-[#737373] line-clamp-2">
                      {subTitle}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default ListSection;

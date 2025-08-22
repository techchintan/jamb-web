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
    <div className="bg-[#E3E3E3]">
      <div className="p-10 flex flex-col gap-8 container items-center mx-auto">
        <div className="text-xl font-medium">{title}</div>
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent className="">
            {list.map(({ image, subTitle, title }, index) => (
              <CarouselItem
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full p-0 select-none sm:basis-3/4 md:basis-3/4 lg:basis-1/2 xl:basis-1/5"
              >
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center h-full ml-9"
                >
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default ListSection;

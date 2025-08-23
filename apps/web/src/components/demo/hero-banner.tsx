import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="container mx-auto sticky top-[77px] md:top-[109px] w-full z-1">
      <Image
        alt=""
        src={"/images/hero-banner.png"}
        width={1436}
        height={768}
        className="mx-auto w-full px-5 md:px-10"
      />
    </div>
  );
};

export default HeroBanner;

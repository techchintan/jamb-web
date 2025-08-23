import HeroBanner from "@/components/demo/hero-banner";
import TabList from "@/components/demo/tab-list";
import ListSection from "@/components/sections/list-section";
import Section from "@/components/sections/section";

export default async function Page() {
  return (
    <div>
      <HeroBanner />
      <TabList />
      <Section
        buttonList={[
          { label: "Explore our Fireplaces" },
          { label: "Sell an Antique Chimneypiece" },
        ]}
        className="pb-0"
        desc="Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam."
        image="/images/fireplaces.png"
        title="Fireplaces"
      />
      <Section
        buttonList={[{ label: "Explore our Lighting" }]}
        desc="Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam."
        image="/images/lighting.png"
        title="Lighting"
      />
      <ListSection
        title="Our latest chimneypieces"
        list={Array.from({ length: 8 }, () => ({
          image: "/images/easton-marble.jpg",
          title: "Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam.",
          subTitle: "Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam.",
        }))}
      />
      <ListSection
        title="Our latest lighting"
        list={Array.from({ length: 5 }, () => ({
          image: "/images/dish-light.jpg",
          title: "Lorem Ipsum",
          subTitle: "Subtitle",
        }))}
      />
      <Section
        buttonList={[{ label: "Explore our Furniture" }]}
        desc="Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam."
        image="/images/furniture.png"
        title="Furniture"
      />
      <ListSection
        title="Our latest furniture"
        list={Array.from({ length: 5 }, (_, i) => ({
          image: `/images/latest-furniture-${i + 1}.png`,
          title: "Lorem Ipsum",
          subTitle: "Subtitle",
        }))}
      />
      <Section
        buttonList={[{ label: "Discover more" }]}
        desc="Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam."
        image="/images/grand-collection.png"
        title="The Grand Collection"
        heading="JOURNAL"
        className="bg-[#DFDAD7]"
      />
      <ListSection
        title="See more of our latest stories"
        list={Array.from({ length: 5 }, () => ({
          image: `/images/jamb-most-prized-possession.jpg`,
          title: "Lorem Ipsum",
          subTitle: "Subtitle",
        }))}
      />
      <Section
        buttonList={[{ label: "Discover more" }]}
        desc="Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam."
        image="/images/jamb-journal.png"
        title="Subscribe to the Jamb Journal"
      />
    </div>
  );
}

import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData, queryGlobalSeoSettings } from "@/lib/sanity/query";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

export async function FooterServer() {
  const [response, settingsResponse] = await Promise.all([
    sanityFetch({
      query: queryFooterData,
    }),
    sanityFetch({
      query: queryGlobalSeoSettings,
    }),
  ]);

  if (!response?.data || !settingsResponse?.data) return <FooterSkeleton />;
  return <Footer />;
}

export function FooterSkeleton() {
  return (
    <footer className="mt-16 pb-8">
      <section className="container mx-auto px-4 md:px-6">
        <div className="h-[500px] lg:h-auto">
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <div className="h-[40px] w-[80px] bg-muted rounded animate-pulse" />
                </span>
                <div className="mt-6 h-16 w-full bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center space-x-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 bg-muted rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {[1, 2, 3].map((col) => (
                <div key={col}>
                  <div className="mb-6 h-6 w-24 bg-muted rounded animate-pulse" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-4 w-full bg-muted rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center lg:flex-row lg:items-center lg:text-left">
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
            <div className="flex justify-center gap-4 lg:justify-start">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

const mainList = [
  [
    {
      title: "Reproduction Chimneypieces",
      list: [
        "Marble",
        "Stone",
        "Grates & Accessories",
        "Guide to Jamb Marbles",
      ],
    },
    {
      title: "Antique Chimneypieces",
      list: ["French & Italian", "Georgian", "Regency"],
    },
    {
      title: "Sell an Antique Chimneypiece",
      list: [],
    },
  ],
  [
    {
      title: "Reproduction Lighting",
      list: [
        "Hanging Globes",
        "Hanging Lanterns",
        "Wall Lights",
        "Dish Lights",
        "Table Lamps",
        "Chains & Brackets",
      ],
    },
  ],
  [
    {
      title: "Reproduction Furniture",
      list: ["Seating", "Tables", "Mirrors", "The Pantry Collection"],
    },
    {
      title: "Antique Furniture",
      list: [
        "Seating",
        "Tables",
        "Desks",
        "Bookcases & Cabinets",
        "Chests",
        "Mirrors",
        "Fire Accessories",
        "Objects",
        "Works of Arts",
        "Lighting",
      ],
    },
  ],
  [
    {
      title: "Journal",
      list: ["Praesentium", "Voluptatibus", "Accusamus", "Iusto", "Dignissimo"],
    },
  ],
  [
    {
      title: "About",
      list: [
        "Founders",
        "Team",
        "History",
        "Galleries",
        "Workshops",
        "Showrooms",
        "Terms &   Conditions",
      ],
    },
  ],
];

function Footer() {
  return (
    <footer className="p-8 bg-[#E3E3E3] text-base text-[#9C9C9D]">
      <section className="container mx-auto grid grid-cols-5 gap-10">
        <div className="flex flex-col">
          <p>Tel: +44 (0) 207 730 2122</p>
          <p>95–97 Pimlico Rd</p>
          <p>London SW1W 8PH</p>
        </div>
        <Link
          href={"mailto:hello@jamb.co.uk"}
          className="text-base text-[#9C9C9D]"
        >
          hello@jamb.co.uk
        </Link>
        <div />
        <div className="col-span-2 flex justify-end">
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="picture">Newsletter</Label>
            <div className="flex  gap-0.5 ">
              <Input
                type="text"
                placeholder="Search"
                className="bg-white rounded-none outline-none shadow-none focus-visible:ring-transparent focus-visible:border-none h-10"
              />
              <Button
                type="submit"
                variant="outline"
                className="bg-white rounded-none"
                size={"lg"}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        {mainList.map((sublist, index) => (
          <div className="flex flex-col gap-3" key={index}>
            {sublist.map(({ title, list }, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="w-full h-[1px] bg-[#9C9C9D]" />
                <div className="flex flex-col">
                  <p className="text-base text-black">{title}</p>
                  {list.map((item, index) => (
                    <p className="text-base text-[#9C9C9D]" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </footer>
  );
}

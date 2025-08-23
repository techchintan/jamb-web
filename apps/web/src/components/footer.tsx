import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData, queryGlobalSeoSettings } from "@/lib/sanity/query";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
} from "@/lib/sanity/sanity.types";

export async function FooterServer() {
  const [footer, settings] = await Promise.all([
    sanityFetch({
      query: queryFooterData,
    }),
    sanityFetch({
      query: queryGlobalSeoSettings,
    }),
  ]);

  if (!footer?.data || !settings?.data) return <FooterSkeleton />;

  return <Footer footer={footer.data} settings={settings.data} />;
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

interface FooterColumnLink {
  _key?: string;
  name?: string;
  href?: string;
  openInNewTab?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterColumnLink[];
  type?: string;
}

interface FooterProps {
  footer: NonNullable<QueryFooterDataResult>;
  settings: NonNullable<QueryGlobalSeoSettingsResult>;
}

function Footer({ footer, settings }: FooterProps) {
  const columns: FooterColumn[] = Array.isArray(footer.columns)
    ? (footer.columns as FooterColumn[])
    : [];

  const footerColumnsByType: Array<
    Array<{ title: string; links: FooterColumnLink[] }>
  > = Object.values(
    columns.reduce<
      Record<string, Array<{ title: string; links: FooterColumnLink[] }>>
    >((acc, column) => {
      const type = column?.type;
      if (!type) return acc;
      if (!acc[type]) acc[type] = [];
      acc[type].push({
        title: column.title,
        links: Array.isArray(column.links) ? column.links : [],
      });
      return acc;
    }, {}),
  );

  return (
    <footer className="p-5 sm:p-8 bg-[#E3E3E3] text-base text-[#9C9C9D]">
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="flex flex-col">
          <p>Tel: {settings.contactPhone}</p>
          <p>{settings.contactAddress}</p>
        </div>
        <Link
          href={"mailto:hello@jamb.co.uk"}
          className="text-base text-[#9C9C9D]"
        >
          {settings.contactEmail}
        </Link>
        <div className="hidden lg:block" />
        <div className="sm:col-span-2 flex justify-end">
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="picture">Newsletter</Label>
            <div className="flex gap-0.5 ">
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
            <div className="flex items-center gap-2">
              <Checkbox
                id="policy"
                className="rounded-full border-[#9C9C9D] cursor-pointer"
              />
              <Label htmlFor="policy" className="cursor-pointer">
                I agree to our Privacy Policy
              </Label>
            </div>
          </div>
        </div>
        {footerColumnsByType.map((sublist, sublistIdx) => (
          <div className="flex flex-col gap-3" key={sublistIdx}>
            {sublist.map(({ title, links }, groupIdx) => (
              <div key={groupIdx} className="flex flex-col gap-3">
                <div className="w-full h-[1px] bg-[#9C9C9D]" />
                <div className="flex flex-col">
                  <p className="text-base text-black">{title}</p>
                  {links.map((item, linkIdx) => (
                    <Link key={item._key ?? linkIdx} href={item.href || "#"}>
                      <p className="text-base text-[#9C9C9D]">{item.name}</p>
                    </Link>
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

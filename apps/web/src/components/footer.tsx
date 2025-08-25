import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData, queryGlobalSeoSettings } from "@/lib/sanity/query";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
} from "@/lib/sanity/sanity.types";
import { Newsletter } from "./newsletter";

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
    <footer className="p-5 sm:p-12 bg-gainsboro text-base">
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="flex flex-col text-gun-powder">
          <p>Tel: {settings.contactPhone}</p>
          <p>{settings.contactAddress}</p>
        </div>
        <div className="flex flex-col text-gun-powder hover:text-dim-gray transition-all duration-300">
          <Link
            href={`mailto:${settings.contactEmail}`}
            aria-label="Send email"
            className="text-base block w-fit"
          >
            {settings.contactEmail}
          </Link>
        </div>

        <div className="hidden lg:block" />
        <div className="sm:col-span-2 flex justify-end">
          <Newsletter />
        </div>
        {footerColumnsByType.map((sublist, sublistIdx) => (
          <div className="flex flex-col gap-3 line-clamp-1" key={sublistIdx}>
            {sublist.map(({ title, links }, groupIdx: number) => (
              <div key={groupIdx} className="flex flex-col gap-3 line-clamp-1">
                <div className="w-full h-[1px] bg-gun-powder" />
                <div className="flex flex-col">
                  <p className="text-base text-black font-semibold mb-2 line-clamp-1">
                    {title}
                  </p>
                  {links.map((item, linkIdx: number) => (
                    <Link
                      key={item._key || linkIdx}
                      href={item.href || "#"}
                      aria-label={item.name}
                      className="w-fit line-clamp-1"
                    >
                      <p className="text-base text-gun-powder font-medium mb-1.5 line-clamp-1 hover:text-dim-gray transition-all duration-300">
                        {item.name}
                      </p>
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

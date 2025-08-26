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
    <footer className="p-5 sm:p-12 bg-gainsboro">
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        </div>

        <div className="flex flex-col">
          <div className="h-4 w-40 bg-muted rounded animate-pulse" />
        </div>

        <div className="hidden lg:block" />

        <div className="sm:col-span-2 flex justify-end">
          <div className="h-12 w-48 bg-muted rounded animate-pulse" />
        </div>

        {[1, 2, 3].map((col) => (
          <div key={col} className="flex flex-col gap-3">
            <div className="w-full h-[1px] bg-muted" />
            <div className="flex flex-col gap-3">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-3 w-20 bg-muted rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
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
    <footer className="p-5 sm:p-12 bg-gainsboro">
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="flex flex-col text-gun-powder text-sm gap-2">
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
                  <p className="text-base text-gun-powder font-semibold mb-2 line-clamp-1">
                    {title}
                  </p>
                  {links.map((item, linkIdx: number) => (
                    <Link
                      key={item._key || linkIdx}
                      href={item.href || "#"}
                      aria-label={item.name}
                      className="w-fit line-clamp-1"
                    >
                      <p className="text-sm text-gun-powder/80 font-medium mb-1.5 line-clamp-1 hover:text-dim-gray transition-all duration-300">
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

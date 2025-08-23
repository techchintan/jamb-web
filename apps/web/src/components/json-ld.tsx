import { stegaClean } from "next-sanity";
import type {
  ContactPoint,
  ImageObject,
  Organization,
  WebSite,
  WithContext,
} from "schema-dts";

import { client } from "@/lib/sanity/client";
import { querySettingsData } from "@/lib/sanity/query";
import type { QuerySettingsDataResult } from "@/lib/sanity/sanity.types";
import { getBaseUrl, handleErrors } from "@/utils";

// Utility function to safely render JSON-LD
export function JsonLdScript<T>({ data, id }: { data: T; id: string }) {
  return (
    <script type="application/ld+json" id={id}>
      {JSON.stringify(data, null, 0)}
    </script>
  );
}

// Organization JSON-LD Component
interface OrganizationJsonLdProps {
  settings: QuerySettingsDataResult;
}

export function OrganizationJsonLd({ settings }: OrganizationJsonLdProps) {
  if (!settings) return null;

  const baseUrl = getBaseUrl();

  const organizationJsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteTitle,
    description: settings.siteDescription || undefined,
    url: baseUrl,
    logo: settings.logo
      ? ({
          "@type": "ImageObject",
          url: settings.logo,
        } as ImageObject)
      : undefined,
    contactPoint: settings.contactEmail
      ? ({
          "@type": "ContactPoint",
          email: settings.contactEmail,
          contactType: "customer service",
        } as ContactPoint)
      : undefined,
  };

  return <JsonLdScript data={organizationJsonLd} id="organization-json-ld" />;
}

// Website JSON-LD Component
interface WebSiteJsonLdProps {
  settings: QuerySettingsDataResult;
}

export function WebSiteJsonLd({ settings }: WebSiteJsonLdProps) {
  if (!settings) return null;

  const baseUrl = getBaseUrl();

  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteTitle,
    description: settings.siteDescription || undefined,
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: settings.siteTitle,
    } as Organization,
  };

  return <JsonLdScript data={websiteJsonLd} id="website-json-ld" />;
}

// Combined JSON-LD Component for pages with multiple structured data
interface CombinedJsonLdProps {
  settings?: QuerySettingsDataResult;
  includeWebsite?: boolean;
  includeOrganization?: boolean;
}

export async function CombinedJsonLd({
  includeWebsite = false,
  includeOrganization = false,
}: CombinedJsonLdProps) {
  const [res] = await handleErrors(client.fetch(querySettingsData));

  const cleanSettings = stegaClean(res);
  return (
    <>
      {includeWebsite && cleanSettings && (
        <WebSiteJsonLd settings={cleanSettings} />
      )}
      {includeOrganization && cleanSettings && (
        <OrganizationJsonLd settings={cleanSettings} />
      )}
    </>
  );
}

import { PageBuilder } from "@/components/pagebuilder";
import { sanityFetch } from "@/lib/sanity/live";
import { queryHomePageData } from "@/lib/sanity/query";
import { getSEOMetadata } from "@/lib/seo";

async function fetchHomePageData() {
  return await sanityFetch({
    query: queryHomePageData,
  });
}

export async function generateMetadata() {
  const { data: homePageData } = await fetchHomePageData();
  return getSEOMetadata(
    homePageData
      ? {
          title: homePageData?.title ?? homePageData?.seoTitle ?? "",
          description:
            homePageData?.description ?? homePageData?.seoDescription ?? "",
          slug: homePageData?.slug,
          contentId: homePageData?._id,
          contentType: homePageData?._type,
        }
      : {},
  );
}

export default async function Page() {
  const { data: homePageData } = await fetchHomePageData();

  if (!homePageData) {
    return (
      <div role="status" aria-live="polite">
        <h1>Home</h1>
        <p>No home page data available.</p>
      </div>
    );
  }

  const { _id, _type, pageBuilder, title } = homePageData ?? {};

  return (
    <>
      <h1 className="sr-only">{title || "Home"}</h1>
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </>
  );
}

import { Images, LinkIcon } from "lucide-react";
import { Link } from "lucide-react";
import { defineField, defineType } from "sanity";

const heroLink = defineField({
  name: "heroLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name for the link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      sectionAnchor: "url.section",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare(selection) {
      const {
        title,
        externalUrl,
        urlType,
        internalUrl,
        sectionAnchor,
        openInNewTab,
      } = selection;

      let url = "/[page not found]";
      if (urlType === "external") {
        url = externalUrl;
      } else if (urlType === "section") {
        url = sectionAnchor;
      } else if (internalUrl) {
        url = `/${internalUrl}`;
      }

      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url && url.length > 30 ? `${url.substring(0, 30)}...` : url;

      let urlTypeLabel = "Internal";
      if (urlType === "external") urlTypeLabel = "External";
      else if (urlType === "section") urlTypeLabel = "Section";

      return {
        title: title || "Untitled Link",
        subtitle: `${urlTypeLabel} • ${truncatedUrl}${newTabIndicator}`,
        media: LinkIcon,
      };
    },
  },
});

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Images,
  type: "object",
  fields: [
    defineField({
      name: "slides",
      type: "array",
      title: "Hero Image Slides",
      description:
        "The slides to display in the hero section. The first slide will be displayed by default.",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(2).max(10),
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Links for the hero section",
      of: [heroLink],
    }),
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare(selection) {
      const { slides } = selection;
      const firstSlide = slides && slides[0];
      return {
        title: "Hero Image Slides",
        subtitle: slides?.length
          ? `${slides.length} image${slides.length > 1 ? "s" : ""}`
          : "No images",
        media: firstSlide?.asset,
      };
    },
  },
});

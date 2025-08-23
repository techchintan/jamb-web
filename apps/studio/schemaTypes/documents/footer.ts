import { LayoutPanelLeft, Link, LinkIcon, PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";

import { createRadioListLayout } from "../../utils/helper";

const footerColumnLink = defineField({
  name: "footerColumnLink",
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

const footerColumn = defineField({
  name: "footerColumn",
  type: "object",
  icon: LayoutPanelLeft,
  fields: [
    defineField({
      name: "type",
      type: "string",
      description: "Choose the type of column you want to create.",
      options: createRadioListLayout([
        "fireplaces",
        "lighting",
        "furniture",
        "journal",
        "other",
      ]),
      initialValue: () => "fireplaces",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title for the column",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Links for the column",
      of: [footerColumnLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Column",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer content for your website",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Columns",
      description: "Columns for the footer",
      of: [footerColumn],
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Footer",
      media: PanelBottom,
    }),
  },
});

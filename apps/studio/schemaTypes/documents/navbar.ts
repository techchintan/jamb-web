import { Link as LinkIcon, PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField } from "../common";

const navbarLink = defineField({
  name: "navbarLink",
  type: "object",
  icon: LinkIcon,
  title: "Navigation Link",
  description: "Individual navigation link with name and URL.",
  fields: [
    defineField({
      name: "url",
      type: "customUrl",
      title: "Link URL",
      description: "The URL that this link will navigate to when clicked.",
    }),
  ],
  preview: {
    select: {
      title: "url.name",
      urlType: "url.type",
      externalUrl: "url.external",
      sectionAnchor: "url.section.current",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare(selection) {
      const {
        title,
        urlType,
        externalUrl,
        sectionAnchor,
        internalUrl,
        openInNewTab,
      } = selection;

      let url = "/[page not found]";
      if (urlType === "external" && externalUrl) {
        url = externalUrl;
      } else if (urlType === "section" && sectionAnchor) {
        url = sectionAnchor;
      } else if (urlType === "internal" && internalUrl) {
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

export const navbar = defineType({
  name: "navbar",
  title: "Site Navigation",
  type: "document",
  icon: PanelTop,
  description: "Configure the main navigation structure for your site.",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Navigation Label",
      initialValue: "Navbar",
      description:
        "Internal label to identify this navigation configuration in the CMS.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Navigation Structure",
      description:
        "Build your navigation menu using columns and links. Add either a column of links or individual links.",
      of: [navbarLink],
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Navigation",
      };
    },
  },
});

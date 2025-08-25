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
      name: "name",
      type: "string",
      title: "Link Text",
      description: "The text that will be displayed for this navigation link.",
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: "Link URL",
      description: "The URL that this link will navigate to when clicked.",
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

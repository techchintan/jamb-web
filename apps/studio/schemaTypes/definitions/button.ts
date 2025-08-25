import { Command, CommandIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { createRadioListLayout } from "../../utils/helper";

const buttonVariants = ["default", "secondary", "outline", "link"];

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",
  icon: Command,
  fields: [
    defineField({
      name: "variant",
      type: "string",
      description:
        "Choose the button's visual style - default is solid, secondary is less prominent, outline has a border, and link looks like regular text",
      initialValue: () => "default",
      options: createRadioListLayout(buttonVariants, {
        direction: "horizontal",
      }),
    }),
    defineField({
      name: "text",
      title: "Button Text",
      type: "string",
      description:
        "The text that appears on the button, like 'Learn More' or 'Get Started'",
    }),
    defineField({
      name: "url",
      title: "Url",
      type: "customUrl",
      description:
        "Where the button links to - can be an internal page or external website",
    }),
  ],
  preview: {
    select: {
      text: "text",
      urlName: "url.name",
      urlType: "url.type",
      externalUrl: "url.external",
      sectionAnchor: "url.section.current",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
      variant: "variant",
    },
    prepare(selection) {
      const {
        text,
        urlName,
        urlType,
        externalUrl,
        sectionAnchor,
        internalUrl,
        openInNewTab,
        variant,
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
        title: text || urlName || "Untitled Button",
        subtitle: `${variant ? variant.charAt(0).toUpperCase() + variant.slice(1) + " • " : ""}${urlTypeLabel} • ${truncatedUrl}${newTabIndicator}`,
        media: CommandIcon,
      };
    },
  },
});

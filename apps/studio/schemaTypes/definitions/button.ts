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
      title: "text",
      variant: "variant",
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
        title: title || "Untitled Button",
        subtitle: `${urlTypeLabel} • ${truncatedUrl}${newTabIndicator}`,
        media: CommandIcon,
      };
    },
  },
});

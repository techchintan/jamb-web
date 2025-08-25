import { LayoutGridIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

export const furnitureType = defineType({
  name: "furnitureType",
  title: "Furniture Type",
  icon: LayoutGridIcon,
  type: "object",
  fields: [
    defineField({
      name: "prefix",
      type: "string",
      title: "Prefix",
      description:
        "Optional prefix text displayed above the title, e.g. 'New' or 'Featured'",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The main heading for this furniture type section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richTextField,
      description: "Short description for this furniture type section",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description: "Main image representing this furniture type",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...buttonsField,
      description: "Call-to-action buttons for this section",
    }),
    defineField({
      name: "bgColor",
      type: "color",
      title: "Background Color",
      description:
        "Background color for this furniture type section, used for the background color of the section",
    }),
  ],
  preview: {
    select: {
      title: "title",
      prefix: "prefix",
      description: "description",
      media: "image",
      buttons: "buttons",
    },
    prepare(selection) {
      const { title, prefix, description, media, buttons } = selection;
      const prefixText = prefix ? `[${prefix}] ` : "";
      let descText = "";
      if (Array.isArray(description) && description.length > 0) {
        // Try to extract plain text from portable text blocks
        descText = description
          .map((block: any) =>
            typeof block.children !== "undefined"
              ? block.children.map((child: any) => child.text).join("")
              : "",
          )
          .join(" ")
          .trim();
      } else if (typeof description === "string") {
        descText = description;
      }
      const buttonCount = Array.isArray(buttons) ? buttons.length : 0;
      const subtitleParts = [];
      if (descText) {
        subtitleParts.push(
          descText.length > 60 ? descText.slice(0, 60) + "..." : descText,
        );
      }
      if (buttonCount > 0) {
        subtitleParts.push(
          `${buttonCount} button${buttonCount > 1 ? "s" : ""}`,
        );
      }
      return {
        title: `${prefixText}${title || "Untitled Furniture Type"}`,
        subtitle: subtitleParts.join(" • "),
        media,
      };
    },
  },
});

import { ListChecksIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const listItem = {
  name: "listItem",
  title: "List Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subTitle",
      type: "string",
      title: "Sub Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description: "Image representing this list item",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
};

export const furnitureLists = defineType({
  name: "furnitureLists",
  title: "Furniture Lists",
  icon: ListChecksIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The main heading for this furniture lists section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lists",
      type: "array",
      title: "Lists",
      of: [listItem],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: `${title || "Untitled Furniture Lists"}`,
      };
    },
  },
});

import { defineField, defineType } from "sanity";

import { createRadioListLayout, isValidUrl } from "../../utils/helper";

const allLinkableTypes = [{ type: "page" }];

export const customUrl = defineType({
  name: "customUrl",
  type: "object",
  description:
    "Configure a link that can point to either an internal page, a section of a page, or an external website",
  fields: [
    defineField({
      name: "type",
      type: "string",
      description:
        "Choose whether this link points to another page on your site (internal), a section of the current page (section), or to a different website (external)",
      options: createRadioListLayout(["internal", "external", "section"]),
      initialValue: () => "external",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      description:
        "When enabled, clicking this link will open the destination in a new browser tab instead of navigating away from the current page",
      initialValue: () => false,
    }),
    defineField({
      name: "external",
      type: "string",
      title: "URL",
      description:
        "Enter a full web address (URL) starting with https:// for external sites",
      hidden: ({ parent }) => parent?.type !== "external",
      validation: (Rule) => [
        Rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "external") {
            if (!value) return "URL can't be empty";
            const isValid = isValidUrl(value);
            if (!isValid) return "Invalid URL";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "section",
      type: "string",
      title: "Section Anchor",
      description:
        "Enter the section anchor (e.g. #about-section). This should match the id of the section you want to link to on the current page.",
      hidden: ({ parent }) => parent?.type !== "section",
      validation: (Rule) => [
        Rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "section") {
            if (!value) return "Section anchor can't be empty";
            if (value !== "#" && !/^#[A-Za-z0-9\-_]+$/.test(value)) {
              return "Section anchor must start with # and contain only letters, numbers, hyphens, or underscores (or just be #)";
            }
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "href",
      type: "string",
      description:
        "Technical field used internally to store the complete URL - you don't need to modify this",
      initialValue: () => "#",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "internal",
      type: "reference",
      description:
        "Select which page on your website this link should point to",
      options: { disableNew: true },
      hidden: ({ parent }) => parent?.type !== "internal",
      to: allLinkableTypes,
      validation: (rule) => [
        rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "internal" && !value?._ref)
            return "internal can't be empty";
          return true;
        }),
      ],
    }),
  ],
  preview: {
    select: {
      externalUrl: "external",
      urlType: "type",
      internalUrl: "internal.slug.current",
      sectionAnchor: "section",
      openInNewTab: "openInNewTab",
    },
    prepare({
      externalUrl,
      urlType,
      internalUrl,
      sectionAnchor,
      openInNewTab,
    }) {
      const url =
        urlType === "external"
          ? externalUrl
          : urlType === "section"
            ? sectionAnchor
            : internalUrl
              ? `/${internalUrl}`
              : "/[page not found]";
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: `${urlType === "external" ? "External" : urlType === "section" ? "Section" : "Internal"} Link`,
        subtitle: `${truncatedUrl}${newTabIndicator}`,
      };
    },
  },
});

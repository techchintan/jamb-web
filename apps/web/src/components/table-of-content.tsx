import { cn } from "@workspace/ui/lib/utils";
import { ChevronDown, Circle } from "lucide-react";
import Link from "next/link";
import { type FC, useMemo } from "react";
import slugify from "slugify";

import type { SanityRichTextBlock, SanityRichTextProps } from "@/types";

// Types
interface TableOfContentProps {
  richText?: SanityRichTextProps;
}

// Constants
const HEADING_STYLES = {
  h2: "pl-0",
  h3: "pl-4",
  h4: "pl-8",
  h5: "pl-12",
  h6: "pl-16",
} as const;

type AnchorProps = {
  heading: ProcessedHeading;
};

function hasValidTextContent(
  children: SanityRichTextBlock["children"],
): children is Array<{
  marks?: string[];
  text?: string;
  _type: "span";
  _key: string;
}> {
  return (
    Array.isArray(children) &&
    children.length > 0 &&
    typeof children[0] === "object" &&
    children[0] !== null &&
    "text" in children[0] &&
    typeof children[0].text === "string"
  );
}

// Utility functions
function extractTextFromBlock(
  children: SanityRichTextBlock["children"],
): string {
  if (!hasValidTextContent(children) || !children) {
    return "";
  }

  const firstChild = children[0];
  return firstChild && "text" in firstChild
    ? (firstChild.text?.trim() ?? "")
    : "";
}

function convertStyleToNumber(style: string): number {
  const match = style.match(/^h([2-6])$/);
  if (!match) {
    throw new Error(`Invalid heading style: ${style}`);
  }

  return Number(match[1]);
}

function createSlug(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  return slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
}

export type HeadingBlock = Extract<SanityRichTextBlock, { _type: "block" }>;

function isHeadingBlock(
  block: NonNullable<NonNullable<SanityRichTextProps>[number]>,
): block is HeadingBlock {
  return Boolean(
    block._type === "block" &&
      block.style &&
      block.style in HEADING_STYLES &&
      block.children &&
      Array.isArray(block.children) &&
      block.children.length > 0,
  );
}

function extractHeadingBlocks(richText: SanityRichTextProps): HeadingBlock[] {
  if (!richText) {
    return [];
  }

  return richText.filter((block) => isHeadingBlock(block));
}

type ProcessedHeading = {
  heading: string;
  href: string;
  head: number;
  text: string;
  children: ProcessedHeading[];
  isChild?: boolean;
  _key?: string;
};

function processHeadingBlocks(headingBlocks: HeadingBlock[]) {
  if (!Array.isArray(headingBlocks) || headingBlocks.length === 0) {
    return [];
  }

  const processedHeadings = headingBlocks
    .map((block) => {
      try {
        const text = extractTextFromBlock(block.children ?? []);

        if (!text) {
          return null;
        }

        return {
          heading: block.style ?? "h2",
          href: `#${createSlug(text)}`,
          head: convertStyleToNumber(block.style ?? ""),
          text,
          children: [],
          _key: block._key,
        };
      } catch (error) {
        console.warn("Failed to process heading block:", error);
        return null;
      }
    })
    .filter((heading) => heading !== null);

  return buildHeadingHierarchy(processedHeadings);
}

function buildHeadingHierarchy(headings: ProcessedHeading[]) {
  if (headings.length === 0) {
    return [];
  }

  const result: ProcessedHeading[] = [];
  const processed = new Set<number>();

  headings.forEach((heading, index) => {
    if (processed.has(index)) {
      return;
    }

    const children = collectChildHeadings(headings, index, processed);

    result.push({
      ...heading,
      children,
    });
  });

  return result;
}

function collectChildHeadings(
  headings: ProcessedHeading[],
  parentIndex: number,
  processed: Set<number>,
): ProcessedHeading[] {
  const parentHeading = headings[parentIndex];
  if (!parentHeading) {
    return [];
  }

  const parentLevel = parentHeading.head;
  const children: ProcessedHeading[] = [];

  for (let i = parentIndex + 1; i < headings.length; i++) {
    const currentHeading = headings[i];

    if (!currentHeading || currentHeading.head <= parentLevel) {
      break;
    }

    if (processed.has(i)) {
      continue;
    }

    processed.add(i);

    const nestedChildren = collectChildHeadings(headings, i, processed);

    children.push({
      ...currentHeading,
      children: nestedChildren,
      isChild: true,
    });
  }

  return children;
}

// Components
const TableOfContentAnchor: FC<AnchorProps> = ({ heading }) => {
  const { href, text, children, isChild, heading: style } = heading;

  if (isChild && (!children || children.length === 0)) {
    return null;
  }

  if (!text || !href) {
    return null;
  }

  const paddingClass =
    HEADING_STYLES[style as keyof typeof HEADING_STYLES] || "pl-0";

  return (
    <li
      className={cn("list-inside my-4", [
        paddingClass,
        isChild ? "ml-1.5" : "",
      ])}
    >
      <span className="flex items-center gap-2">
        <Circle
          className={cn(
            "min-w-1.5 min-h-1.5 size-1.5",
            !isChild && "dark:fill-zinc-100 fill-zinc-900",
          )}
          aria-hidden="true"
        />
        <Link
          href={href}
          className="hover:text-blue-500 hover:underline line-clamp-1 transition-colors duration-200"
        >
          {text}
        </Link>
      </span>

      {children && children.length > 0 && (
        <ul>
          {children.map((child, index) => (
            <TableOfContentAnchor
              heading={child}
              key={child._key || `${child.text}-${index}-${style}`}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const TableOfContent: FC<TableOfContentProps> = ({ richText }) => {
  const { shouldShowTableOfContent, processedHeadings } = useMemo(() => {
    try {
      if (!richText || !Array.isArray(richText)) {
        return {
          shouldShowTableOfContent: false,
          processedHeadings: [],
        };
      }

      const headingBlocks = extractHeadingBlocks(richText);

      if (headingBlocks.length === 0) {
        return {
          shouldShowTableOfContent: false,
          processedHeadings: [],
        };
      }

      const processedHeadings = processHeadingBlocks(headingBlocks);

      return {
        shouldShowTableOfContent: processedHeadings.length > 0,
        processedHeadings,
      };
    } catch (error) {
      console.error("Error processing table of contents:", error);
      return {
        shouldShowTableOfContent: false,
        processedHeadings: [],
      };
    }
  }, [richText]);

  if (!shouldShowTableOfContent) {
    return null;
  }

  return (
    <div className="sticky top-8 flex flex-col w-full max-w-xs p-4 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 shadow-sm rounded-lg border border-zinc-300 dark:border-zinc-700">
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          <span>Table of Contents</span>
          <ChevronDown
            className="h-5 w-5 transform transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <nav className="mt-4 ml-3" aria-label="Table of contents">
          <ul className="text-sm">
            {processedHeadings.map((heading, index) => (
              <TableOfContentAnchor
                heading={heading}
                key={heading._key || `${heading.text}-${index}`}
              />
            ))}
          </ul>
        </nav>
      </details>
    </div>
  );
};

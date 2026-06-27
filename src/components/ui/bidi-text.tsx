import type { ElementType, ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/** Matches numbers, currency, points, age codes and year ranges in mixed RTL text. */
const NUMERIC_CHUNK_RE =
  /\d[\d\s.,٬٫٠-٩]*(?:\s*(?:DA|دج|pts?|pt|\+)?)?|\d{4}\s*[–—-]\s*\d{4}|\+?\d{1,2}(?:\s*pts?)?|U\d{1,2}|\+19/gi;

export function LtrIsolate({
  children,
  className,
  as: Tag = "bdi",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag dir="ltr" className={cn("inline-block text-start [unicode-bidi:isolate]", className)}>
      {children}
    </Tag>
  );
}

export function BidiText({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const { dir } = useI18n();

  if (dir !== "rtl" || !/\d/.test(text)) {
    return <Tag className={className}>{text}</Tag>;
  }

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  const re = new RegExp(NUMERIC_CHUNK_RE.source, "gi");
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <LtrIsolate key={`${match.index}-${match[0]}`} as="span">
        {match[0].trim()}
      </LtrIsolate>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <Tag className={className}>{parts}</Tag>;
}

/** For table cells or standalone numeric values in RTL layouts. */
export function LtrNum({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  return (
    <LtrIsolate as="span" className={cn("tabular-nums", className)}>
      {value}
    </LtrIsolate>
  );
}

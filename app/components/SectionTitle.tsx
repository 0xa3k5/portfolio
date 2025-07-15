"use client";

import cx from "classnames";
import { useTheme } from "@/lib/contexts/ThemeContext";

interface SectionTitleProps {
  title: string;
  className?: string;
  row?: boolean;
  subtext?: string;
}

export default function SectionTitle({
  title,
  className,
  row = false,
  subtext,
}: SectionTitleProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={cx(
        className,
        "flex flex-row items-baseline gap-16 lowercase",
        row ? "sticky top-0 h-fit w-full lg:w-1/6" : null
      )}
    >
      <div className={cx("flex flex-col gap-4")}>
        <h2
          className={cx(
            "text-3xl",
            row ? "lg:whitespace-normal" : "whitespace-nowrap"
          )}
        >
          {title}
        </h2>
        {subtext && <p className="font-mono text-sm opacity-60">{subtext}</p>}
      </div>
      {!row && (
        <hr className={cx("w-full text-opacity-10", themeClasses.color)} />
      )}
    </div>
  );
}

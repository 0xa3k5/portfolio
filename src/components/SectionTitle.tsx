import cx from "classnames";
import { useTheme } from "../contexts/ThemeContext";

interface SectionTitleProps {
  title: string;
  className?: string;
  row?: boolean;
}

export default function SectionTitle({
title,
  className,
  row = false,
}: SectionTitleProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  return (
    <div
      className={cx(
        className,
        "flex flex-row items-baseline gap-16",
        row ? "w-full lg:w-1/6" : ""
      )}
    >
      {!row && (
        <hr className={`w-full ${themeClasses.color} text-opacity-10`} />
      )}
      <div className="relative flex flex-col">
        <h2
          className={`whitespace-nowrap ${
            row ? "text-3xl" : "text-4xl"
          } lowercase ${row ? "lg:whitespace-normal" : ""}`}
        >
          {title}
        </h2>
      </div>
      <hr
        className={`w-full ${row ? "hidden" : "block"} ${
          themeClasses.color
        } text-opacity-10`}
      />
    </div>
  );
}

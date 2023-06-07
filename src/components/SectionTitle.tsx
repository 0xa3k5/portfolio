import cx from "classnames";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";

interface SectionTitleProps {
  title: string;
  className?: string;
  href?: string;
  row?: boolean;
}

export default function SectionTitle({
  title,
  className,
  href,
  row = false,
}: SectionTitleProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  return (
    <div className={cx(className, "flex flex-row items-baseline gap-8")}>
      <h2
        className={`whitespace-nowrap text-2xl lowercase ${
          row ? "lg:whitespace-normal" : ""
        }`}
      >
        {title}
      </h2>
      <hr className={`w-full ${themeClasses.color} text-opacity-10`} />
      {href && (
        <Link
          href={href}
          className={cx(
            "flex whitespace-nowrap rounded-xl bg-opacity-40 py-2 px-4 duration-150",
            themeClasses.color,
            themeClasses.textHover,
            themeClasses.bg,
            themeClasses.bgHover
          )}
        >
          See More
        </Link>
      )}
    </div>
  );
}

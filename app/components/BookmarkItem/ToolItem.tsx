import Link from "next/link";
import { Bookmarks } from "../../types";
import { useTheme } from "../../lib/contexts/ThemeContext";
import cx from "classnames";

interface Props {
  bookmark: Bookmarks;
  className?: string;
}

export default function ToolItem({ bookmark, className }: Props) {
  const { themeClasses } = useTheme();
  return (
    <Link
      href={bookmark.url}
      className={cx(
        "flex rounded-xl border border-opacity-5 bg-opacity-0 px-8 py-10 duration-150 hover:bg-opacity-5",
        themeClasses.border,
        themeClasses.bgInverse,
        className
      )}
    >
      <span className="flex items-start gap-6 md:flex-col">
        <span className="flex items-center gap-4">
          {bookmark.favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bookmark.favicon}
              alt={`${bookmark.name} Website Favicon`}
              className="h-10 w-10"
            />
          ) : (
            <span
              className={cx(
                "flex h-10 w-10 items-center justify-center rounded-lg bg-opacity-10 text-xl",
                themeClasses.bgInverse
              )}
            >
              {bookmark.name.slice(0, 1)}
            </span>
          )}
        </span>
        <span className="flex flex-col gap-1">
          <span>{bookmark.name}</span>
          <span className="text-sm opacity-40">
            {bookmark.url.replace(/^(https?:\/\/)?(www\.)?/i, "")}
          </span>
          <span className={cx("mt-2 text-sm opacity-40")}>
            {bookmark.tags.join(", ")}
          </span>
        </span>
      </span>
    </Link>
  );
}

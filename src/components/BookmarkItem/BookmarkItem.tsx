import Link from "next/link";
import { Bookmarks } from "../../types";
import { useTheme } from "../../contexts/ThemeContext";
import cx from "classnames";

interface Props {
  bookmark: Bookmarks;
  className?: string;
}

export default function BookmarkItem({ bookmark, className }: Props) {
  const { themeClasses } = useTheme();
  return (
    <Link
      href={bookmark.url}
      className={cx(
        "flex items-center justify-between gap-8 border-b border-opacity-10 bg-opacity-0 px-4 py-6 duration-150 hover:bg-opacity-5",
        themeClasses.border,
        themeClasses.bgInverse,
        className
      )}
    >
      <span className="flex items-center gap-4">
        {bookmark.favicon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.favicon}
            alt={`${bookmark.name} Website Favicon`}
            className="h-8 w-8"
          />
        ) : (
          <span
            className={cx(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-opacity-10 text-xl",
              themeClasses.bgInverse
            )}
          >
            {bookmark.name.slice(0, 1)}
          </span>
        )}

        <span className="flex flex-col">
          <span className="w-64 truncate">{bookmark.name}</span>
          <span className="w-64 truncate text-sm opacity-40">
            {bookmark.url.replace(/^(https?:\/\/)?(www\.)?/i, "")}
          </span>
        </span>
      </span>
    </Link>
  );
}

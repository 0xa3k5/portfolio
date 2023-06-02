import cx from "classnames";
import Link from "next/link";
import { NotionPost } from "../../types";
import { LockIcon, RightArrowIcon } from "../../icons";
import { useTheme } from "../../contexts/ThemeContext";

interface MorePostsProps {
  className?: string;
  posts: NotionPost[];
}

export default function MorePosts({
  className,
  posts,
}: MorePostsProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={cx(
        "flex w-full max-w-3xl flex-col justify-between gap-8 md:flex-row md:px-16",
        className
      )}
    >
      {posts.map((p, i) => {
        return (
          <Link
            key={p.properties.id}
            href={`/works/${encodeURIComponent(p.properties.slug)}`}
            passHref
            className=""
          >
            <div
              className={cx(
                "group flex flex-col gap-4",
                i === 0 ? "items-start" : "items-end"
              )}
            >
              <div
                className={cx(
                  "flex gap-2 duration-150",
                  i === 0 ? "flex-row" : "flex-row-reverse",
                  `${themeClasses.color} text-opacity-40 group-hover:text-opacity-100`
                )}
              >
                {i === 0 ? (
                  <RightArrowIcon className="w-6 rotate-180 duration-150 group-hover:-translate-x-1/2" />
                ) : (
                  <RightArrowIcon className="w-6 duration-150 group-hover:translate-x-1/2" />
                )}
                <p className="text-md uppercase tracking-widest">
                  {i === 0 ? "Previous" : "Next"}
                </p>
              </div>

              <h6
                className={cx(
                  "max-w-xs text-3xl font-medium leading-snug",
                  i === 0 ? "text-left" : "text-right",
                  `hover:${themeClasses.textHighlight}`
                )}
              >
                <span className="inline-block">
                  {p.properties.password && (
                    <LockIcon className="mr-2 shrink-0 opacity-100" />
                  )}
                </span>
                {p.details.title}
              </h6>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

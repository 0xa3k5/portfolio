import cx from "classnames";
import Link from "next/link";
import { NotionPost } from "../../types";
import { LockIcon, RightArrowIcon } from "../../icons";

interface MorePostsProps {
  className?: string;
  posts: NotionPost[];
}

export default function MorePosts({
  className,
  posts,
}: MorePostsProps): JSX.Element {
  return (
    <div
      className={cx("flex flex-col w-full gap-8 md:px-16 md:flex-row max-w-3xl justify-between", className)}
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
                "group flex flex-col gap-4 hover:text-daisy",
                i === 0 ? "items-start" : "items-end"
              )}
            >
              <div
                className={cx(
                  "flex gap-2 text-white text-opacity-40 duration-150 group-hover:text-opacity-100",
                  i === 0 ? "flex-row" : "flex-row-reverse"
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
                  i === 0 ? "text-left" : "text-right"
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

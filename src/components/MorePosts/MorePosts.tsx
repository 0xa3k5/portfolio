import cx from "classnames";
import Link from "next/link";
import { NotionPost } from "../../../@types/schema";

import LeftArrowPlainIcon from "../../../public/icons/left-arrow-plain.svg";
import RightArrowPlainIcon from "../../../public/icons/right-arrow-plain.svg";
import LockIcon from "../../../public/icons/lock.svg";

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
      className={cx(
        "flex flex-col space-y-24 space-x-0 px-4 py-24 md:flex-row md:space-y-0 md:space-x-24",
        className
      )}
    >
      {posts.map((p, i) => {
        return (
          <Link
            key={p.properties.id}
            href={`/works/${encodeURIComponent(p.properties.slug)}`}
            passHref
          >
            <a className="">
              <div
                className={cx(
                  "group flex flex-col space-y-4 hover:text-daisy",
                  i === 0 ? "items-start" : "items-end"
                )}
              >
                <div
                  className={cx(
                    "flex space-x-2 text-white text-opacity-40 duration-200 group-hover:text-opacity-100",
                    i === 0 ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  {i === 0 ? (
                    <LeftArrowPlainIcon className="w-6 duration-200 group-hover:-translate-x-1/2" />
                  ) : (
                    <RightArrowPlainIcon className="w-6 duration-200 group-hover:translate-x-1/2" />
                  )}
                  <p className="text-md uppercase tracking-widest">
                    {i === 0 ? "Previous" : "Next"}
                  </p>
                </div>

                <h6
                  className={cx(
                    "max-w-sm font-vollkorn text-3xl font-medium leading-snug",
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
            </a>
          </Link>
        );
      })}
    </div>
  );
}

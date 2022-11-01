import Link from "next/link";
import { MouseEventHandler } from "react";
import { NotionPost } from "../../../../@types/schema";

import RightArrowPlainIcon from "../../../../public/icons/right-arrow-plain.svg";
import LockIcon from "../../../../public/icons/lock.svg";
import cx from "classnames";

interface CompactProps {
  className?: string;
  post: NotionPost;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}

export default function Compact({
  post,
  onMouseEnter,
  onMouseLeave,
}: CompactProps): JSX.Element {
  return (
    <div
      className="border-b border-white border-opacity-10 pb-8 last:border-none md:pb-12"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/works/${post.properties.slug}`} legacyBehavior>
        <div
          className={cx(
            "group flex items-baseline space-x-4 hover:cursor-pointer",
            !post.properties.password && "md:hover:space-x-3"
          )}
        >
          {post.properties.password ? (
            <LockIcon className="w-8 shrink-0 opacity-40 group-hover:opacity-100" />
          ) : (
            <RightArrowPlainIcon className="w-8 shrink-0 opacity-40 duration-100 group-hover:opacity-100 md:group-hover:translate-x-1/3" />
          )}
          <span className="font-vollkorn text-3xl font-medium leading-snug duration-75">
            {post.details.title}
          </span>
        </div>
      </Link>
    </div>
  );
}

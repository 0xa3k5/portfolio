import Link from "next/link";
import { MouseEventHandler } from "react";
import { NotionPost } from "../../../types";

import RightArrowPlainIcon from "../../../../public/icons/right-arrow-plain.svg";
import LockIcon from "../../../../public/icons/lock.svg";
import SoonIcon from "../../../../public/icons/soon.svg";
import cx from "classnames";

interface ContentCardProps {
  className?: string;
  post: NotionPost;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}

const getIconByProp = (prop: NotionPost["properties"]) => {
  switch (true) {
    case prop.password:
      return (
        <LockIcon className="w-8 shrink-0 opacity-40 group-hover:opacity-100" />
      );
    case prop.published:
      return (
        <RightArrowPlainIcon className="w-8 shrink-0 opacity-40 duration-100 group-hover:opacity-100 md:group-hover:translate-x-1/3" />
      );
    default:
      return (
        <SoonIcon className="w-8 shrink-0 opacity-40 group-hover:opacity-100" />
      );
  }
};

export default function ContentCard({
  post,
  onMouseEnter,
  onMouseLeave,
}: ContentCardProps): JSX.Element {
  return (
    <div
      className="border-b border-white border-opacity-10 pb-8 last:border-none md:pb-12"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={`/works/${post.properties.slug}`}
        className={!post.properties.published ? "pointer-events-none" : null}
      >
        <div className="group flex items-baseline gap-4 hover:cursor-pointer">
          {getIconByProp(post.properties)}
          <h6
            className={cx(
              "text-3xl leading-snug duration-100",
              !post.properties.password &&
                post.properties.published &&
                "md:group-hover:-translate-x-2"
            )}
          >
            {post.details.title}
          </h6>
        </div>
      </Link>
    </div>
  );
}

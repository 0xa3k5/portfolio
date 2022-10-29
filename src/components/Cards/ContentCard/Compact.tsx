import Link from "next/link";
import { MouseEventHandler } from "react";
import { NotionPost } from "../../../../@types/schema";

import RightArrowPlain from "../../../../public/icons/right-arrow-plain.svg";

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
      className="max-w-md border-b border-white border-opacity-10 last:border-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/works/${post.properties.slug}`}>
        <div className="group flex items-start space-x-4  pb-12 hover:cursor-pointer md:hover:space-x-3">
          <RightArrowPlain className="w-8 shrink-0 opacity-40 duration-100 group-hover:opacity-100 md:group-hover:translate-x-1/3" />
          <span
            className="font-vollkorn text-2xl font-medium leading-snug duration-75 md:text-3xl lg:max-w-lg"
            style={{ color: post.properties.bgColor }}
          >
            {post.details.title}
          </span>
        </div>
      </Link>
    </div>
  );
}

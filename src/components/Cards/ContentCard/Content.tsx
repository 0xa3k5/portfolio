import Link from "next/link";
import { useState } from "react";
import { NotionPost } from "../../../types";
import Image from "next/image";

import cx from "classnames";
import { LockIcon, RightArrowIcon, SoonIcon } from "../../../icons";

interface ContentCardProps {
  className?: string;
  post: NotionPost;
}

const getIconByProp = (prop: NotionPost["properties"]) => {
  switch (true) {
    case prop.password:
      return (
        <LockIcon className="w-8 shrink-0 opacity-40 group-hover:opacity-100" />
      );
    case prop.published:
      return (
        <RightArrowIcon className="w-8 shrink-0 opacity-40 duration-150 group-hover:opacity-100 md:group-hover:translate-x-1/3" />
      );
    default:
      return (
        <SoonIcon className="w-8 shrink-0 opacity-40 group-hover:opacity-100" />
      );
  }
};

export default function ContentCard({ post }: ContentCardProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/works/${post.properties.slug}`}
      className={post.properties.published ? null : "pointer-events-none"}
    >
      <div
        className={`group flex h-[28rem] w-full items-center justify-between gap-16 overflow-clip rounded-xl py-8 pl-8 duration-150`}
        onMouseEnter={() => setHover(!hover)}
        onMouseLeave={() => setHover(!hover)}
        style={{
          backgroundColor: hover ? `#${post.properties.bgColor}` : "#0d0d12",
        }}
      >
        <div
          className="flex items-baseline gap-4 hover:cursor-pointer"
          style={{ color: hover ? `#${post.properties.color}` : "#fff" }}
        >
          {getIconByProp(post.properties)}
          <h6
            className={cx(
              "text-3xl leading-snug duration-150",
              !post.properties.password &&
                post.properties.published &&
                "md:group-hover:-translate-x-2"
            )}
          >
            {post.details.title}
          </h6>
        </div>
        <Image
          className="duration-150 group-hover:scale-105"
          alt={post.details.title}
          src={post.details.overviewImg}
          width={400}
          height={400}
        />
      </div>
    </Link>
  );
}

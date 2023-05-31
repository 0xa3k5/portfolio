import Link from "next/link";
import { useState } from "react";
import { NotionPost } from "../../../types";
import Image from "next/image";

import cx from "classnames";
import { LockIcon, RightArrowIcon, SoonIcon } from "../../../icons";

interface SideProjectsCardProps {
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

export default function SideProjectsCard({
  post,
}: SideProjectsCardProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/works/${post.properties.slug}`}
      className={`${
        post.properties.published ? null : "pointer-events-none"
      } group col-span-1 flex w-full flex-col gap-6 overflow-clip rounded-xl duration-150`}
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
    >
      <div className="relative flex aspect-square w-full items-center justify-center overflow-clip rounded-2xl border border-shark">
        <Image
          className="duration-150 group-hover:scale-105"
          alt={post.details.title}
          src={post.details.overviewImg}
          width={512}
          height={512}
        />
      </div>
      <div className="flex flex-col gap-2 px-4">
        <span className="text-white/40">{post.details.period}</span>
        <h6 className="text-2xl leading-snug">{post.details.title}</h6>
        {/* <p className="text-md font-light text-white/40">
          {post.details.description}
        </p> */}
        {/* <div className="flex gap-2">{getIconByProp(post.properties)}</div> */}
      </div>
    </Link>
  );
}

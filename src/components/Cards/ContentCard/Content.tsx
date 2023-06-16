import cx from "classnames";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NotionPost } from "../../../types";
import { LockIcon, RightArrowIcon, SoonIcon } from "../../../icons";
import { hexToRGB } from "../../../utils";

interface ContentCardProps {
  className?: string;
  post: NotionPost;
}

const getIconByProp = (prop: NotionPost["properties"]) => {
  switch (true) {
    case prop.password:
      return <LockIcon className="h-5 w-5" />;
    case prop.published:
      return (
        <RightArrowIcon className="h-5 w-5 duration-100 group-hover:translate-x-1/3" />
      );
    default:
      return <SoonIcon className="h-5 w-5" />;
  }
};

export default function ContentCard({
  post,
  className,
}: ContentCardProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cx(
        className,
        post.properties.published ? null : "pointer-events-none",
        "flex h-[32rem] w-full flex-col justify-center gap-8 overflow-clip rounded-xl py-8 duration-150 lg:flex-row lg:items-center lg:justify-between 2xl:gap-24"
      )}
      style={{
        backgroundColor: `#${post.properties.bgColor}`,
      }}
    >
      <div
        className="flex flex-col gap-6 px-12 hover:cursor-pointer lg:pl-16 lg:pr-0"
        style={{ color: `#${post.properties.color}` }}
      >
        {post.org.logo && (
          <div className="relative h-6 w-full">
            <Image
              src={post.org.logo}
              alt={`${post.org.orgName} Logo`}
              fill
              style={{ objectFit: "contain", objectPosition: "left" }}
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h6 className="text-3xl leading-snug duration-150">
            {post.details.title}
          </h6>
          <p className="text-lg opacity-70">{post.details.description}</p>
        </div>
        <Link
          href={`/works/${post.properties.slug}`}
          onMouseEnter={() => setHover(!hover)}
          onMouseLeave={() => setHover(!hover)}
          className={`group flex w-fit items-center gap-2 rounded-xl py-4 pl-4 pr-6 duration-150 ${
            post.properties.published ? null : "pointer-events-none"
          }`}
          style={{
            color: !hover
              ? `#${post.properties.color}`
              : `#${post.properties.bgColor}`,
            backgroundColor: !hover
              ? `rgba(${hexToRGB(post.properties.color)},0.1)`
              : `rgba(${hexToRGB(post.properties.color)},1)`,
          }}
        >
          {getIconByProp(post.properties)}
          Case Study
        </Link>
      </div>
      <Image
        alt={post.details.title}
        src={post.details.overviewImg}
        width={400}
        height={400}
        className="hidden lg:block"
      />
    </div>
  );
}

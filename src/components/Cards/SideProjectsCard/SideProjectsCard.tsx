import Link from "next/link";
import { useState } from "react";
import { NotionPost } from "../../../types";
import Image from "next/image";

interface SideProjectsCardProps {
  className?: string;
  post: NotionPost;
}

export default function SideProjectsCard({
  post,
}: SideProjectsCardProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/works/${post.properties.slug}`}
      className={`${
        post.properties.published ? null : "pointer-events-none"
      } group col-span-1 flex w-full flex-col gap-6 overflow-clip duration-150`}
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
      </div>
    </Link>
  );
}

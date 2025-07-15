"use client";
import cx from "classnames";
import Link from "next/link";
import { SideProject } from "@/types/types";
import Image from "next/image";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { RightArrowIcon } from "@/lib/icons";
import Button from "../../Button";

interface SideProjectsCardProps {
  className?: string;
  post: SideProject;
}

export default function SideProjectsCard({
  post,
  className,
}: SideProjectsCardProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <Link
      href={post.website ?? ""}
      target="_blank"
      className={cx(
        "flex h-full w-full flex-col justify-between gap-8 rounded-2xl border border-opacity-5 bg-opacity-5 px-4 py-6 duration-150 hover:bg-opacity-10 md:p-8",
        themeClasses.color,
        themeClasses.border,
        themeClasses.bgHover,
        themeClasses.bgInverse,
        post.website ?? "pointer-events-none",
        className
      )}
    >
      <span className="flex w-full items-start justify-between">
        <span className="flex flex-col">
          <span
            className={`flex rounded-full ${themeClasses.border} mb-2 w-fit border border-opacity-10 bg-opacity-10 px-2 py-1`}
          >
            <span className="text-sm opacity-60">{post.date}</span>
          </span>
          <h6 className="text-2xl">{post.title}</h6>
          <span className="opacity-60">{post.description}</span>
        </span>
        {post.website && (
          <Button.Icon circle>
            <RightArrowIcon className="h-6 w-6 -rotate-45 duration-150 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Button.Icon>
        )}
      </span>
      <span className="flex w-full gap-2">
        {post.thumbnail && post.thumbnail.length
          ? post.thumbnail.map((thumbnail, i) => {
              return (
                <span
                  key={i}
                  className="relative flex h-32 w-32 overflow-clip rounded-xl"
                >
                  <Image
                    alt={post.title}
                    src={thumbnail}
                    width={512}
                    height={512}
                    priority
                    style={{
                      objectFit: "cover",
                    }}
                    sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                  />
                </span>
              );
            })
          : null}
      </span>
    </Link>
  );
}

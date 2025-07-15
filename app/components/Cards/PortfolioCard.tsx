"use client";
import cx from "classnames";
import { NotionPost } from "@/types/types";
import Image from "next/image";
import { RightArrowIcon, LockIcon, SoonIcon } from "@/lib/icons";
import Link from "next/link";
import { useState } from "react";
import { useButtonHoverSound } from "@/lib/hooks/useButtonHoverSound";
import { hexToRGB } from "@/lib/utils";
import Tooltip from "@/components/Tooltip";

interface Props {
  className?: string;
  post: NotionPost;
}

const getIconByProp = (prop: NotionPost["properties"]) => {
  switch (true) {
    case prop.password:
      return <LockIcon className="h-5 w-5" />;
    case prop.published:
      return (
        <RightArrowIcon className="h-5 w-5 duration-100 group-hover:translate-x-1/4" />
      );
    default:
      return <SoonIcon className="h-5 w-5" />;
  }
};

export default function PortfolioCard({ className, post }: Props): JSX.Element {
  const [isButtonHover, setIsButtonHover] = useState(false);

  const { playSound } = useButtonHoverSound();

  const handleBtnMouseEnter = () => {
    setIsButtonHover(true);
    if (!post.properties.password) {
      playSound();
    }
  };

  const handleBtnMouseLeave = () => {
    setIsButtonHover(false);
  };

  return (
    <div
      className={cx(
        "relative flex min-h-[60dvh] w-screen items-center md:min-h-screen",
        className
      )}
      style={{
        backgroundColor: `#${post.properties.bgColor}`,
        color: `#${post.properties.color}`,
      }}
    >
      <div className="container flex max-w-5xl flex-col items-center space-y-12 py-8 sm:py-24">
        <div className="flex w-full justify-between gap-20">
          <div className="space-y-4">
            <h2 className="max-w-2xl text-4xl">{post.details.title}</h2>
            <p className="hidden max-w-2xl text-lg opacity-60 sm:block">
              {post.details.description}
            </p>
            <div className="flex gap-2">
              {post.details.categories.length > 0
                ? post.details.categories.map((c, i) => {
                    return (
                      <span
                        key={i}
                        className="flex w-fit rounded-full border px-3 py-1 text-sm"
                        style={{
                          borderColor: `#${post.properties.color}1A`,
                        }}
                      >
                        {c}
                      </span>
                    );
                  })
                : null}
            </div>
          </div>
          <Link
            href={`/works/${post.properties.slug}`}
            onMouseEnter={handleBtnMouseEnter}
            onMouseLeave={handleBtnMouseLeave}
            className={`group relative flex h-fit w-fit flex-wrap items-center gap-2 whitespace-nowrap rounded-xl px-4 py-4 duration-100 ${
              post.properties.published ? null : "pointer-events-none"
            }`}
            style={{
              color: isButtonHover
                ? `#${post.properties.bgColor}`
                : `#${post.properties.color}`,
              backgroundColor: isButtonHover
                ? `rgba(${hexToRGB(post.properties.color)},1)`
                : `rgba(${hexToRGB(post.properties.color)},0.1)`,
            }}
          >
            {isButtonHover && !post.properties.password && (
              <Tooltip text="Read Case Study" position="bottom" />
            )}
            {getIconByProp(post.properties)}
          </Link>
        </div>
        <div className="relative aspect-square w-full">
          <Image
            src={post.details.overviewImg}
            alt=""
            priority
            fill
            className="object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
}

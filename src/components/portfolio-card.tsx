import { cx } from "@/src/utils/cx";
import { hexToRGB } from "@/src/utils/hex-to-rgb";
import Link from "next/link";
import Image from "next/image";
import { getIconByProp } from "@/src/utils/icon-by-prop";
import { NotionPost } from "@/src/types";

export const PortfolioCard = ({ post }: { post: NotionPost }) => {
  return (
    <div
      data-published={post.properties.published}
      className={cx(
        `
          flex h-[32rem] w-full flex-col justify-center gap-8 overflow-clip rounded-xl py-8 duration-150 lg:flex-row lg:items-center lg:justify-between 2xl:gap-24
          data-[published=true]:pointer-events-auto
          data-[published=false]:pointer-events-none
          `
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "contain",
                objectPosition: "left",
              }}
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h6 className="text-3xl leading-snug duration-150">
            {post.details.title}
          </h6>
          <p className="text-lg opacity-70 max-h-[3lh] truncate w-full whitespace-pre-line">
            {post.details.description}
          </p>
        </div>
        <Link
          href={`/works/${post.properties.slug}`}
          data-published={post.properties.published}
          className={`
              group flex w-fit items-center gap-2 rounded-xl py-4 pl-4 pr-6 duration-150
              data-[published=true]:pointer-events-auto
              data-[published=false]:pointer-events-none
              `}
          style={{
            color: `#${post.properties.color}`,
            backgroundColor: `rgba(${hexToRGB(post.properties.color)},0.1)`,
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
};

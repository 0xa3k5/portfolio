import cx from "classnames";
import { NotionPost } from "../../../@types/schema";
import Image from "next/image";

interface PostProps {
  className?: string;
  post: NotionPost;
}

export default function Post({ className, post }: PostProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        "mb:pb-8 flex h-[60vh] md:h-[90vh] items-center justify-center px-6 pb-4 md:gap-24 md:px-0"
      )}
      style={{
        backgroundColor: `#${post.properties.bgColor}`,
        color: `#${post.properties.color}`,
      }}
    >
      <div className="flex md:pl-16 max-w-lg flex-col space-y-2 md:space-y-4 ">
        <h1 className="font-vollkorn text-5xl font-bold md:leading-snug">
          {post.details.title}
        </h1>
        <p className="max-w-md opacity-80 text-xl md:leading-loose">
          {post.details.description}
        </p>
      </div>
      <div className="hidden md:inline-block relative h-full w-1/2">
        <Image
          src={post.details.img}
          alt={post.details.title}
          layout="fill"
          objectFit="contain"
          objectPosition='right'
          priority
          unoptimized
        />
      </div>
    </div>
  );
}

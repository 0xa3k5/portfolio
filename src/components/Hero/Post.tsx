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
        "flex h-[90vh] items-center justify-center px-6 pb-4 md:gap-24 md:px-0 md:pb-8"
      )}
      style={{
        backgroundColor: `#${post.properties.bgColor}`,
        color: `#${post.properties.color}`,
      }}
    >
      <div className="flex max-w-lg flex-col space-y-2 md:space-y-4 md:pl-16 ">
        <h1 className="text-5xl font-bold md:leading-snug">
          {post.details.title}
        </h1>
        <p className="max-w-md text-xl opacity-80 md:leading-loose">
          {post.details.description}
        </p>
      </div>
      <div className="relative hidden h-full w-1/2 md:inline-block">
        <Image
          src={post.details.img}
          alt={post.details.title}
          layout="fill"
          objectFit="contain"
          objectPosition="right"
        />
      </div>
    </div>
  );
}

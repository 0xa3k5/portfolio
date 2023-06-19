import cx from "classnames";
import Link from "next/link";
import { SideProject } from "../../../types";
import Image from "next/image";
import { useTheme } from "../../../contexts/ThemeContext";
import { RightArrowIcon } from "../../../icons";
import Button from "../../Button";

interface SideProjectsCardProps {
  className?: string;
  post: SideProject;
}

export default function SideProjectsCard({
  post,
  className,
}: SideProjectsCardProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  return (
    <Link
      href={post.website ?? ""}
      target="_blank"
      className={cx(
        "group flex h-full w-full flex-col justify-between gap-8 rounded-2xl border border-opacity-5 p-8 duration-150 hover:bg-opacity-5",
        themeClasses.color,
        themeClasses.border,
        themeClasses.bgHover,
        post.website ?? "pointer-events-none",
        className
      )}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col">
          <div
            className={`flex rounded-full ${themeClasses.border} mb-2 w-fit border border-opacity-10 bg-opacity-10 px-2 py-1`}
          >
            <span className="text-sm opacity-60">{post.date}</span>
          </div>
          <h6 className="text-2xl">{post.title}</h6>
          <span className="opacity-60">{post.description}</span>
        </div>
        {post.website && (
          <Button.Icon
            href={post.website}
            className={cx(
              "-translate-x-4 translate-y-4 rounded-full bg-white/5 opacity-0 duration-150 hover:bg-opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
              themeClasses.bgHover
            )}
            icon={<RightArrowIcon className="h-5 w-5 -rotate-45" />}
          />
        )}
      </div>
      <div className={`relative flex w-full shrink-0 overflow-clip rounded-xl`}>
        <Image
          alt={post.title}
          src={post.thumbnail ?? ""}
          width={512}
          height={512}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
    </Link>
  );
}

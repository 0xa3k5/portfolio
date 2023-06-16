import Link from "next/link";
import { SideProject } from "../../../types";
import Image from "next/image";
import { useTheme } from "../../../contexts/ThemeContext";
import { RightArrowIcon } from "../../../icons";

interface SideProjectsCardProps {
  className?: string;
  post: SideProject;
}

export default function SideProjectsCard({
  post,
}: SideProjectsCardProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  return (
    <div
      className={`${themeClasses.color} flex w-full flex-col gap-12 overflow-clip duration-150 md:flex-row md:items-center`}
    >
      <div
        className={`relative flex h-56 w-full shrink-0 items-center justify-center overflow-clip rounded-xl border border-opacity-10 md:w-56 ${themeClasses.border}`}
      >
        <Image
          alt={post.title}
          src={post.thumbnail ?? ''}
          fill
          priority
          style={{
            objectFit: "cover",
          }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
      <div className="flex flex-col gap-4 py-4">
        <div
          className={`flex rounded-full ${themeClasses.border} w-fit border border-opacity-10  bg-opacity-10 px-2 py-1`}
        >
          <span className="text-sm opacity-60">{post.date}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-2xl">{post.title}</h6>
          <span className="opacity-60">{post.description}</span>
        </div>
        {post.website && (
          <Link
            href={post.website}
            target="_blank"
            className="text-md group flex items-center gap-1 py-2"
          >
            Visit
            <RightArrowIcon className="h-5 w-5 -rotate-45 duration-150 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}

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
      className={`${themeClasses.color} flex w-full items-center gap-8 overflow-clip duration-150`}
    >
      <div
        className={`relative flex h-64 w-64 shrink-0 items-center justify-center overflow-clip rounded-xl border border-opacity-10 ${themeClasses.border} md:aspect-square`}
      >
        <Image alt={post.title} src={post.img} fill />
      </div>
      <div className="flex flex-col gap-2 py-4">
        <span className="opacity-40">{post.date}</span>
        <h6 className="text-3xl">{post.title}</h6>
        <span className="opacity-60">{post.description}</span>
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

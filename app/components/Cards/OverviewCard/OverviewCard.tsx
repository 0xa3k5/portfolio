import Link from "next/link";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { Collaborator, NotionPost } from "@/types/types";
import cx from "classnames";
import CollaboratorItem from "./CollaboratorItem";

interface OverviewCardProps {
  post: NotionPost;
  collaborators: Collaborator[];
}

export default function OverviewCard({
  post,
  collaborators,
}: OverviewCardProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`flex w-full justify-between gap-8 overflow-scroll border-b border-opacity-10 pb-12 ${themeClasses.border}`}
    >
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">ORG</p>
        <Link
          href={post.org.website || ""}
          target="_blank"
          className={cx(
            "text-lg duration-150 md:text-base",
            themeClasses.textHover
          )}
        >
          {post.org.orgName}
        </Link>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">Year</p>
        <p className="text-lg md:text-base">{post.details.period}</p>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">Position</p>
        <p className="text-lg md:text-base">{post.details.position}</p>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">
          Contributions
        </p>
        <ul className="w-full gap-2">
          {post.details.contributions.split("-").map((c, i) => {
            return (
              <li className="text-lg md:text-base" key={i}>
                {c}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-2">
        <p className="text-xs uppercase tracking-widest opacity-60">
          Collaborators
        </p>
        <ul className="grid grid-cols-4 gap-2">
          {collaborators.map((collab, i) => {
            return (
              <CollaboratorItem
                className="col-span-1"
                collaborator={collab}
                key={i}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

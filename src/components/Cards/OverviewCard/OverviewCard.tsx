import Link from "next/link";
import { useTheme } from "../../../contexts/ThemeContext";
import { Collaborator, NotionPost } from "../../../types";
import Image from "next/image";
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
  console.log(collaborators)

  return (
    <div
      className={`flex w-full justify-between border-b border-opacity-10 pb-12 ${themeClasses.border}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">ORG</p>
        <Link
          href={post.org.website}
          target="_blank"
          className={cx(
            "text-lg duration-150 md:text-base",
            themeClasses.textHover
          )}
        >
          {post.org.orgName}
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">Year</p>
        <p className="text-lg md:text-base">{post.details.period}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">Position</p>
        <p className="text-lg md:text-base">{post.details.position}</p>
      </div>
      <div className="flex flex-col gap-1">
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
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">
          Collaborators
        </p>
        <div className="flex gap-2">
          {collaborators.map((collab, i) => {
            return <CollaboratorItem collaborator={collab} key={i}  />;
          })}
        </div>
      </div>
    </div>
  );
}

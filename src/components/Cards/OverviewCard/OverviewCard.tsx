import { NotionPost } from "../../../types";

interface OverviewCardProps {
  post: NotionPost;
}

export default function OverviewCard({ post }: OverviewCardProps): JSX.Element {
  return (
    <div className="flex w-full justify-between border-b border-shark pb-12 md:w-2/3">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">ORG</p>
        <p className="text-lg md:text-base">{post.org.orgName}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">Type</p>
        <p className="text-lg md:text-base">{post.details.type}</p>
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
        <ul className="gap-2">
          {post.details.contributions.split("-").map((c, i) => {
            return (
              <li className="text-lg md:text-base" key={i}>
                {c}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

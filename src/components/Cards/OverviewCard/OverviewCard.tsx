import { useTheme } from "../../../contexts/ThemeContext";
import { NotionPost } from "../../../types";

interface OverviewCardProps {
  post: NotionPost;
}

export default function OverviewCard({ post }: OverviewCardProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={`grid grid-cols-2 justify-center gap-12 border-b border-opacity-10 pb-12 sm:grid-cols-12 ${themeClasses.border}`}
    >
      <div className="col-span-1 flex flex-col gap-1 sm:col-span-2 sm:col-start-2">
        <p className="text-xs uppercase tracking-widest opacity-60">ORG</p>
        <p className="text-lg md:text-base">{post.org.orgName}</p>
      </div>
      <div className="col-span-1 flex flex-col gap-1 sm:col-span-2">
        <p className="text-xs uppercase tracking-widest opacity-60">Type</p>
        <p className="text-lg md:text-base">{post.details.type}</p>
      </div>
      <div className="col-span-1 flex flex-col gap-1 sm:col-span-2">
        <p className="text-xs uppercase tracking-widest opacity-60">Year</p>
        <p className="text-lg md:text-base">{post.details.period}</p>
      </div>
      <div className="col-span-1 flex flex-col gap-1 sm:col-span-2">
        <p className="text-xs uppercase tracking-widest opacity-60">Position</p>
        <p className="text-lg md:text-base">{post.details.position}</p>
      </div>
      <div className="col-span-1 flex flex-col gap-1 sm:col-span-3">
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
    </div>
  );
}

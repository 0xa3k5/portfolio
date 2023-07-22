import { Collaborator, WorkExp } from "../../types";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";
import CollaboratorItem from "../Cards/OverviewCard/CollaboratorItem";

interface WorkExperienceProps {
  job: WorkExp;
  collaborators: Collaborator[];
}

export default function WorkExperience({
  job,
  collaborators,
}: WorkExperienceProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`flex ${themeClasses.border} flex-col-reverse items-center justify-between gap-4 border-b border-opacity-10 py-8 last-of-type:border-none sm:flex-row`}
    >
      <div className="flex w-1/2 flex-col  gap-4">
        <span className={`${themeClasses.color} text-opacity-40`}>
          {job.period}
        </span>
        <Link
          href={job.website}
          target="_blank"
          rel="noreferrer"
          className="group flex w-full flex-row items-center gap-4"
        >
          <h6 className="text-2xl">{job.company}</h6>
        </Link>
      </div>
      <ul className="grid grid-cols-6 gap-2">
        {collaborators.map((collab, i) => {
          return (
            <CollaboratorItem
              className="col-span-1"
              key={i}
              collaborator={collab}
            />
          );
        })}
      </ul>
    </div>
  );
}

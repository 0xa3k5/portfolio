import { Collaborator, WorkExp } from "../../types";

import Image from "next/image";
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
      className={`flex ${themeClasses.border} flex-col-reverse py-8 items-center justify-between gap-4 border-b border-opacity-10 last-of-type:border-none sm:flex-row`}
    >
      <div className="flex flex-col gap-4">
        <span className={`${themeClasses.color} text-opacity-40`}>
          {job.period}
        </span>
        <Link
          href={job.website}
          target="_blank"
          rel="noreferrer"
          className="group flex w-full flex-row items-center gap-4"
        >
          <span
            className="relative h-12 w-12 shrink-0 overflow-clip rounded-lg duration-150 group-hover:-translate-y-1"
            key={job.id}
          >
            <Image
              src={job.logo}
              alt={`${job.logo} logo`}
              fill
              priority
              style={{
                objectFit: "contain",
                maxWidth: "100%",
              }}
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            />
          </span>
          <span className="flex w-full flex-col duration-150">
            <span className="text-lg">{job.company}</span>
            <span className="opacity-40">{job.tagline}</span>
          </span>
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

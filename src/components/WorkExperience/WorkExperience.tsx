import { WorkExp } from "../../types";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";

interface WorkExperienceProps {
  job: WorkExp;
}

export default function WorkExperience({
  job,
}: WorkExperienceProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`flex ${themeClasses.border} border-opacity-10 flex-col-reverse justify-between gap-4 border-b pb-8 last-of-type:border-none sm:flex-row md:pb-12`}
    >
      <div className="flex flex-col gap-4">
        <Link
          href={job.website}
          target="_blank"
          rel="noreferrer"
          className="group flex w-full flex-row items-center gap-4"
        >
          <div
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
          </div>
          <div className="flex w-full flex-col duration-150">
            <span className="text-lg">{job.company}</span>
            <span className="opacity-40">{job.tagline}</span>
          </div>
        </Link>
      </div>
      <span className={`${themeClasses.color} text-opacity-40`}>{job.period}</span>
    </div>
  );
}

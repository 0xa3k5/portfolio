import { WorkExp } from "../../types";

import Image from "next/image";
import Link from "next/link";

interface WorkExperienceProps {
  job: WorkExp;
}

export default function WorkExperience({
  job,
}: WorkExperienceProps): JSX.Element {
  return (
    <div className="flex flex-col border-b border-shark py-12 last-of-type:border-none md:flex-row md:justify-between">
      <div className="flex flex-col gap-4">
        <Link
          href={job.website}
          target="_blank"
          rel="noreferrer"
          className="group flex w-full flex-col gap-4 md:flex-row md:items-center"
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
          <div className="flex w-full flex-col duration-150 group-hover:text-daisy">
            <span className="text-lg">{job.company}</span>
            <span className="opacity-40">{job.tagline}</span>
          </div>
        </Link>
      </div>
      <span className="text-white/40">{job.period}</span>
    </div>
  );
}

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
    <div className="flex flex-col border-b border-white border-opacity-10 py-12 last-of-type:border-none md:flex-row">
      <div className="flex w-1/2 flex-col gap-4">
        <span>{job.period}</span>
        <Link
          href={job.website}
          target="_blank"
          rel="noreferrer"
          className="group flex w-full flex-col gap-4 md:flex-row md:items-center"
        >
          <div
            className="relative h-12 w-12 shrink-0 overflow-clip rounded-lg duration-200 group-hover:-translate-y-1"
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
          <div className="flex flex-col duration-200 group-hover:text-daisy">
            <span className="text-lg">{job.company}</span>
            <span className="opacity-40">{job.tagline}</span>
          </div>
        </Link>
      </div>
      <div className="flex w-full flex-col gap-8 md:w-4/6">
        <span className="text-lg font-light leading-normal tracking-wide opacity-80">
          {job.description}
        </span>
      </div>
    </div>
  );
}

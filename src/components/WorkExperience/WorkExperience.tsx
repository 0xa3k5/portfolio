import cx from "classnames";
import { WorkExp } from "../../../@types/schema";

import Image from "next/image";

interface WorkExperienceProps {
  classname?: string;
  job: WorkExp;
}

export default function WorkExperience({
  classname,
  job,
}: WorkExperienceProps): JSX.Element {
  return (
    <div className={cx(classname, "flex w-full flex-col py-12 lg:flex-row")}>
      <div className="group mb-8 flex flex-1 lg:mb-0">
        <a href={job.website} target="_blank" rel="noreferrer">
          <div className="flex flex-col gap-4">
            <p className="text-lg opacity-40">{job.period}</p>
            <div className="flex items-start  gap-4 duration-200 group-hover:text-daisy">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg duration-200 group-hover:-translate-y-1">
                <Image
                  src={job.logo}
                  alt={`${job.logo} logo`}
                  fill
                  style={{
                    objectFit: "fill",
                    maxWidth: "100%",
                  }}
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-lg">{job.company}</p>
                <p className="opacity-60">{job.tagline}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="flex-1">
        <p className="text-lg leading-relaxed opacity-90">{job.description}</p>
      </div>
    </div>
  );
}

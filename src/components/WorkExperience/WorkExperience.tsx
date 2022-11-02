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
    <div className={cx(classname, "flex w-full flex-col py-16 lg:flex-row")}>
      <div className="group mb-8 flex flex-1 lg:mb-0">
        <a href={job.website} target="_blank" rel="noreferrer">
          <div className="flex flex-col space-y-4">
            <p className="text-lg opacity-40">{job.period}</p>
            <div className="flex items-start space-x-4 duration-200 group-hover:text-daisy">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg duration-200 group-hover:-translate-y-1">
                <Image
                  src={job.logo}
                  alt={`${job.logo} logo`}
                  fill
                  style={{
                    objectFit: "fill",
                  }}
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
        <p className="text-lg leading-relaxed opacity-70">{job.description}</p>
      </div>
    </div>
  );
}

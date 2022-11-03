import { WorkExp } from "../../@types/schema";
import SectionTitle from "../components/SectionTitle";
import WorkExperience from "../components/WorkExperience";
import SectionsWrapper from "./SectionsWrapper";

interface WorkExperiencesProps {
  className?: string;
  workExp: WorkExp[];
}

export default function WorkExperiences({
  className,
  workExp,
}: WorkExperiencesProps): JSX.Element {
  return (
    <SectionsWrapper className={className}>
      <SectionTitle title="day jobs" />
      {workExp
        .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
        .map((w: WorkExp) => {
          return (
            <WorkExperience
              job={w}
              key={`about-${w.id}`}
              classname="border-b border-opacity-10 border-white last-of-type:border-none"
            />
          );
        })}
    </SectionsWrapper>
  );
}

import { Exploration } from "../types";
import SectionTitle from "../components/SectionTitle";
import ExplorationsCard from "../components/Cards/ExplorationsCard/ExplorationsCard";
import SectionsWrapper from "./SectionsWrapper";

interface ExplorationsProps {
  className?: string;
  explorations: Exploration[];
}

export default function Explorations({
  className,
  explorations,
}: ExplorationsProps): JSX.Element {
  return (
    <SectionsWrapper className={className}>
      <SectionTitle title="some explorations" className="mb-8 md:mb-16" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {explorations.map((exp) => {
          return <ExplorationsCard exploration={exp} key={exp.id} />;
        })}
      </div>
    </SectionsWrapper>
  );
}

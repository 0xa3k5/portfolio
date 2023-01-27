import { Feedback } from "../types";
import FeedbackCard from "../components/Cards/FeedbackCard";
import SectionTitle from "../components/SectionTitle";
import SectionsWrapper from "./SectionsWrapper";

interface FeedbacksProps {
  className?: string;
  feedbacks: Feedback[];
}

export default function Feedbacks({
  className,
  feedbacks,
}: FeedbacksProps): JSX.Element {
  return (
    <SectionsWrapper className={className}>
      <SectionTitle title="honest & real reviews" />
      {feedbacks.map((f) => {
        return (
          <FeedbackCard.Single
            feedback={f}
            key={f.id}
            classname="border-b border-opacity-10 border-white last-of-type:border-none"
          />
        );
      })}
    </SectionsWrapper>
  );
}

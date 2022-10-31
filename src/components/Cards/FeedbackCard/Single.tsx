import cx from "classnames";
import { Feedback } from "../../../../@types/schema";
import Image from "next/image";

interface SingleProps {
  classname?: string;
  feedback: Feedback;
}

export default function Single({
  classname,
  feedback,
}: SingleProps): JSX.Element {
  return (
    <div className={cx(classname, "flex space-x-12 py-12")}>
      <div className="flex w-2/6 flex-col space-y-8">
        <div
          className={cx("relative h-16 w-16 overflow-hidden rounded-full")}
          key={feedback.id}
        >
          <Image
            src={feedback.img}
            alt={feedback.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex w-fit flex-col space-y-2">
          <span className="text-xl">{feedback.name}</span>
          <span className="opacity-40">{feedback.role}</span>
        </div>
      </div>

      <div className={cx("flex w-4/6 flex-col space-y-8")}>
        <span className="text-xl font-light leading-normal tracking-wide">
          {feedback.feedback}
        </span>
      </div>
    </div>
  );
}

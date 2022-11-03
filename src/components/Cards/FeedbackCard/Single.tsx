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
    <div className={cx(classname, "flex flex-col gap-8 py-12 md:flex-row")}>
      <div className="flex h-fit w-full flex-col gap-4 md:w-2/6 md:flex-row md:items-center">
        <div
          className={cx("relative h-16 w-16 overflow-hidden rounded-full")}
          key={feedback.id}
        >
          <Image
            src={feedback.img}
            alt={feedback.name}
            fill
            style={{
              objectFit: "contain",
              maxWidth: "100%",
            }}
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl">{feedback.name}</span>
          <span className="opacity-40">{feedback.role}</span>
        </div>
      </div>
      <div className={cx("flex w-full flex-col gap-8 md:w-4/6")}>
        <span className="text-xl font-light leading-normal tracking-wide opacity-90">
          {feedback.feedback}
        </span>
      </div>
    </div>
  );
}

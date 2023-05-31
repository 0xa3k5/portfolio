import cx from "classnames";
import { Feedback } from "../../../types";

import Image from "next/image";
import { useState } from "react";

interface GroupedProps {
  classname?: string;
  feedback: Feedback[];
}

export default function Grouped({
  classname,
  feedback,
}: GroupedProps): JSX.Element {
  const [selected, setSelected] = useState<Feedback>(feedback[0]);

  return (
    <div
      className={cx(
        classname,
        "container flex max-w-3xl flex-col items-center gap-12 overflow-hidden rounded-2xl bg-white bg-opacity-5 px-4 py-12 md:p-16"
      )}
    >
      <div className="flex h-16 items-center gap-8">
        {feedback.map((f) => {
          return (
            <div
              className={cx(
                "relative overflow-hidden rounded-full duration-150",
                selected === f
                  ? "h-16 w-16 opacity-100 outline outline-2 outline-offset-4 outline-white"
                  : "h-12 w-12 opacity-40"
              )}
              key={f.id}
              onClick={() => setSelected(f)}
            >
              <Image
                src={f.img}
                alt={f.name}
                fill
                style={{
                  objectFit: "cover",
                  maxWidth: "100%",
                }}
                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
              />
            </div>
          );
        })}
      </div>
      <div className="flex">
        {feedback.map((f) => {
          return (
            <div
              className={cx(
                selected === f ? "visible" : "hidden",
                "flex h-full flex-col items-center gap-8 text-center duration-150"
              )}
              key={f.id}
            >
              <span className="text-lg font-extralight leading-normal tracking-wide">
                {f.feedback}
              </span>
              <div className="flex flex-col gap-2 border-t border-t-white border-opacity-20 pt-8">
                <span className="text-xl">{f.name}</span>
                <span className="opacity-40">
                  {f.role} @ {f.orgName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

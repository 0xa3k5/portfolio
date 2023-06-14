import cx from "classnames";
import { Feedback } from "../../../types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface GroupedProps {
  classname?: string;
  feedback: Feedback[];
}

export default function Grouped({
  classname,
  feedback,
}: GroupedProps): JSX.Element {
  const [bgColor, setBgColor] = useState("");
  const { theme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  useEffect(() => {
    if (theme === "dark") {
      setBgColor("bg-white");
    } else if (theme === "light") {
      setBgColor("bg-shark");
    } else if (theme === "dim") {
      setBgColor("bg-white");
    }
  }, [theme]);

  return (
    <div
      className={cx(
        classname,
        "grid grid-cols-2 gap-4 overflow-hidden rounded-2xl"
      )}
    >
      {feedback.map((f) => {
        return (
          <div
            key={f.id}
            className={cx(
              bgColor,
              "col-span-1 flex h-fit flex-col items-start gap-6 rounded-2xl bg-opacity-5 p-8"
            )}
          >
            <div
              className={`${themeClasses.border} flex w-full items-center gap-4 border-b border-opacity-20 pb-8`}
            >
              <div
                className={cx(
                  "relative h-12 w-12 shrink-0 overflow-clip rounded-full"
                )}
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
              <div className="flex flex-col">
                <span className="text-lg">{f.name}</span>
                <span className="opacity-40">
                  {f.role} @ {f.orgName}
                </span>
              </div>
            </div>
            <span className="text-lg font-light leading-normal tracking-wide">
              {f.feedback}
            </span>
          </div>
        );
      })}
    </div>
  );
}

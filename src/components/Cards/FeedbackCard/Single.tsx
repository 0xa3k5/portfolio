import { useTheme } from "../../../contexts/ThemeContext";
import { Feedback } from "../../../types";
import Image from "next/image";

interface SingleProps {
  classname?: string;
  feedback: Feedback;
}

export default function Single({ feedback }: SingleProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={`flex flex-col gap-4 border-b border-opacity-10 ${themeClasses.border} py-12 last-of-type:border-none md:flex-row`}
    >
      <div className="flex w-full flex-col gap-4 md:w-1/2 md:flex-row">
        <div
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
          key={feedback.id}
        >
          <Image
            src={feedback.img}
            alt={feedback.name}
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
        <div className="flex flex-col">
          <span className="text-lg">{feedback.name}</span>
          <span className="opacity-40">{feedback.role}</span>
        </div>
      </div>
      <span
        className={`${themeClasses.color}/80 text-lg font-light leading-normal tracking-wide md:w-2/3`}
      >
        {feedback.feedback}
      </span>
    </div>
  );
}

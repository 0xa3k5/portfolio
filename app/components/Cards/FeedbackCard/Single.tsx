import { useTheme } from "@/lib/contexts/ThemeContext";
import { Feedback } from "@/types/types";
import Image from "next/image";

interface SingleProps {
  classname?: string;
  feedback: Feedback;
}

export default function Single({ feedback }: SingleProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`flex flex-col gap-4 border-b border-opacity-10 pb-12 ${themeClasses.border} last-of-type:border-none`}
    >
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
          key={feedback.id}
        >
          <Image
            src={feedback.img || ""}
            alt={feedback.name || ""}
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
        className={`${themeClasses.color} text-lg font-light leading-normal tracking-wide text-opacity-80`}
      >
        {feedback.feedback}
      </span>
    </div>
  );
}

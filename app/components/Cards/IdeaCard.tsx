"use client";
import cx from "classnames";
import { useState } from "react";
import { Idea } from "@/types/types";
import ReactMarkdown from "react-markdown";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import { ChevronLeftIcon } from "@/lib/icons";
import Link from "next/link";
import { useTheme } from "@/lib/contexts/ThemeContext";

interface Props {
  className?: string;
  idea: Idea;
  md?: string;
}

export default function IdeaCard({ className, idea, md }: Props): JSX.Element {
  const { themeClasses } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cx(
        "flex w-full flex-col gap-6 border-b border-opacity-10 pb-8 last-of-type:border-none",
        themeClasses.border,
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={toggleExpanded}
        >
          <div className="flex flex-col">
            <span className="opacity-60">
              {new Date(idea.date).toDateString()}
            </span>
            <h6 className="font-sans text-2xl font-bold">{idea.name}</h6>
          </div>
          <Button.Icon>
            <ChevronLeftIcon
              className={cx(
                "h-5 w-5 duration-150",
                isExpanded ? "rotate-90" : "-rotate-90"
              )}
            />
          </Button.Icon>
        </div>
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag, i) => (
            <Chip key={i} text={tag} />
          ))}
        </div>
      </div>
      {isExpanded && md && (
        <article className="prose-base">
          <ReactMarkdown>{md}</ReactMarkdown>
        </article>
      )}
      {isExpanded && idea.killedBy && (
        <div
          className={cx(
            "flex flex-col gap-2 rounded-r-xl border-l-2 border-opacity-20 bg-opacity-5 px-8 py-4",
            themeClasses.bgInverse,
            themeClasses.border
          )}
        >
          <span className="">☠️ Killed By:</span>
          {idea.killedByLink ? (
            <Link
              href={idea.killedByLink}
              target="_blank"
              className={cx("duration-150", themeClasses.textHover)}
            >
              <span className="">{idea.killedBy}</span>
            </Link>
          ) : (
            <span className="">{idea.killedBy}</span>
          )}
        </div>
      )}
    </div>
  );
}

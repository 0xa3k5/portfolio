import cx from "classnames";
import Button from "../Button";
import { useState } from "react";

interface CTAProps {
  className?: string;
  title?: string;
  desc?: string;
}

export default function CTA({
  className,
  title = "Book a free discovery call",
  desc = "I help startups with product design, design critics, QA testing and design advisory.",
}: CTAProps): JSX.Element {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cx(
        className,
        "flex h-[40vh] items-center justify-center px-4 md:h-[60vh] md:px-0"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
        <h4 className="font-vollkorn text-4xl font-semibold md:text-5xl">
          {title}
        </h4>
        <p className="max-w-sm text-xl font-normal opacity-80">{desc}</p>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="mt-2"
        >
          <Button.LinkBtn href="https://calendly.com/akmlio/discovery" />
        </div>
      </div>
    </div>
  );
}

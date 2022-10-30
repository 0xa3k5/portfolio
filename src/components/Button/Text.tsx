import cx from "classnames";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface TextProps {
  className?: string;
  href: string;
  text: string;
  targetBlank?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Text({
  className,
  text,
  href,
  targetBlank = true,
  onClick,
}: TextProps): JSX.Element {
  return (
    <div
      className={cx(
        "flex items-center space-x-2 rounded-full duration-200 hover:text-daisy",
        className
      )}
    >
      {targetBlank ? (
        <a href={href} target={"_blank"} rel={"noreferrer"} onClick={onClick}>
          {text}
        </a>
      ) : (
        <Link href={href} passHref scroll={false}>
          <a onClick={onClick}>{text}</a>
        </Link>
      )}
    </div>
  );
}

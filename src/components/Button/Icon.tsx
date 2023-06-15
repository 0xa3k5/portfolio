import cx from "classnames";
import { ReactNode } from "react";
import Link from "next/link";

interface IconProps {
  className?: string;
  icon: ReactNode;
  href: string;
}

export default function Icon({
  className,
  icon,
  href,
}: IconProps): JSX.Element {
  return (
    <div className={cx("flex p-2", className)}>
      <Link className="flex p-2" href={href}>
        {icon}
      </Link>
    </div>
  );
}

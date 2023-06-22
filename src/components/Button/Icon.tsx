import { ReactNode } from "react";
import Link from "next/link";

interface IconProps {
  className?: string;
  icon: ReactNode;
  href: string;
}

export default function Icon({ icon, href }: IconProps): JSX.Element {
  return (
    <Link className="flex p-2" href={href} target="_blank">
      <span>{icon}</span>
    </Link>
  );
}

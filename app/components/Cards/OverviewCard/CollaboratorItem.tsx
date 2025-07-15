"use client";
import Image from "next/image";

import { useState } from "react";
import Tooltip from "../../Tooltip";
import Link from "next/link";
import { Collaborator } from "@/types/types";
import cx from "classnames";

interface Prop {
  collaborator: Collaborator;
  className?: string;
}

export default function CollaboratorItem({
  collaborator,
  className,
}: Prop): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className={cx("relative", className)}>
      {isHovered && <Tooltip position="bottom" text={collaborator.name} />}
      <Link
        href={collaborator.url}
        target="_blank"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center grayscale duration-150 hover:scale-110 hover:grayscale-0"
      >
        <span className="relative flex h-8 w-8 shrink-0 overflow-clip rounded-full">
          <Image
            src={collaborator.image}
            alt={`${collaborator.name}'s image`}
            className="object-contain"
            fill
            priority
          />
        </span>
      </Link>
    </li>
  );
}

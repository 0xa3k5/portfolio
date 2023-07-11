import Image from "next/image";
import { useState } from "react";
import Tooltip from "../../Tooltip";
import Link from "next/link";
import { Collaborator } from "../../../types";

interface Prop {
  collaborator: Collaborator;
}

export default function CollaboratorItem({ collaborator }: Prop): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {isHovered && <Tooltip position="bottom" text={collaborator.name} />}
      <Link
        href={collaborator.url}
        target="_blank"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center gap-2"
      >
        <span className="relative flex h-8 w-8 shrink-0 overflow-clip rounded-full">
          <Image
            src={collaborator.image}
            alt={`${collaborator.name}'s image`}
            className="object-cover"
            fill
            priority
          />
        </span>
      </Link>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Collaborator as TCollaborator } from "../types";
import { Tooltip } from "./tooltip";

export const Collaborator = ({ collab }: { collab: TCollaborator }) => {
  return (
    <li key={collab.id} className="relative group/collab">
      <Tooltip
        position="bottom"
        text={collab.name}
        className="hidden group-hover/collab:block"
      />

      <Link
        href={collab.url}
        target="_blank"
        className="relative flex items-center grayscale duration-150 hover:scale-110 hover:grayscale-0"
      >
        <span className="relative flex h-8 w-8 shrink-0 overflow-clip rounded-full">
          <Image
            src={collab.image}
            alt={`${collab.name}'s image`}
            className="object-contain"
            fill
            priority
          />
        </span>
      </Link>
    </li>
  );
};

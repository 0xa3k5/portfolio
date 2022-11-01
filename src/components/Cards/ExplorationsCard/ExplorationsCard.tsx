import Image from "next/image";
import { Exploration } from "../../../../@types/schema";
import Video from "./Video";

interface ExplorationsCardProps {
  exploration: Exploration;
}

export default function ExplorationsCard({
  exploration,
}: ExplorationsCardProps): JSX.Element {
  return (
    <div className="aspect-square overflow-clip rounded-xl bg-white bg-opacity-10">
      {exploration.type === "video" ? (
        <Video src={exploration.img} />
      ) : (
        <div className="relative h-full w-full">
          <Image
            src={exploration.img}
            alt={exploration.name}
            unoptimized
            fill
            sizes="100vw"
            style={{
              objectFit: "cover"
            }} />
        </div>
      )}
    </div>
  );
}

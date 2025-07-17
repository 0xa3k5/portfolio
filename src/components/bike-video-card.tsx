import { BikeVideo } from "@/src/types";
import VideoPlayer360 from "./video-player/video-player-360";
import { VideoStatusIcon } from "./icons/video-status";

export default function BikeVideoCard({ video }: { video: BikeVideo }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const parseVideoTitle = (title: string) => {
    if (title.startsWith("-") || title.startsWith("+")) {
      const firstChar = title.charAt(0);
      const restOfTitle = title.slice(1);

      const sentenceCase = restOfTitle
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      return {
        icon: firstChar,
        title: sentenceCase,
      };
    }

    return {
      icon: null,
      title: title,
    };
  };

  const { icon, title: displayTitle } = parseVideoTitle(video.title);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 border border-foam/10 rounded-xl bg-foam/5">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg min-h-[300px] md:min-h-[400px]">
        <VideoPlayer360
          src={video.videoUrl}
          videoId={video.id}
          initialMuted={true}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {icon && <VideoStatusIcon status={icon as "+" | "-"} />}
          <h3 className="text-xl font-semibold text-foam">{displayTitle}</h3>
        </div>
        <span className="text-sm text-foam/60">{formatDate(video.date)}</span>
        <p className="text-foam/80 leading-relaxed transition-all duration-300">
          {video.description}
        </p>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { useVideoContext } from "@/src/hooks/use-video-context";

interface YouTubePlayerProps {
  videoId: string;
  playerId: string;
}

export default function YouTubePlayer({
  videoId,
  playerId,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const { playVideo, pauseVideo } = useVideoContext();

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const youtubeVideoId = getYouTubeVideoId(videoId);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube player when API is ready
    const onYouTubeIframeAPIReady = () => {
      if (!containerRef.current || !youtubeVideoId) return;

      playerRef.current = new window.YT.Player(containerRef.current!, {
        height: "100%",
        width: "100%",
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 1, // Show YouTube controls
          disablekb: 0,
          enablejsapi: 1,
          fs: 1, // Allow fullscreen
          iv_load_policy: 3,
          modestbranding: 0,
          rel: 0,
          showinfo: 1,
        },
        events: {
          onStateChange: (event: { data: number; target: YouTubePlayer }) => {
            // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
            if (event.data === window.YT.PlayerState.PLAYING) {
              playVideo(playerId);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              pauseVideo(playerId);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [youtubeVideoId, playerId]);

  if (!youtubeVideoId) {
    return (
      <div className="flex items-center justify-center h-full bg-black/20 rounded-lg">
        <p className="text-foam/60">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

// YouTube IFrame API types
interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  mute(): void;
  unMute(): void;
  setVolume(volume: number): void;
  destroy(): void;
}

interface YouTubePlayerOptions {
  height: string;
  width: string;
  videoId: string;
  playerVars: {
    autoplay?: number;
    controls?: number;
    disablekb?: number;
    enablejsapi?: number;
    fs?: number;
    iv_load_policy?: number;
    modestbranding?: number;
    rel?: number;
    showinfo?: number;
    mute?: number;
    volume?: number;
  };
  events: {
    onReady?: (event: { target: YouTubePlayer }) => void;
    onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
  };
}

interface YouTubeAPI {
  Player: new (
    element: HTMLElement,
    options: YouTubePlayerOptions
  ) => YouTubePlayer;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

// Add YouTube IFrame API types to window
declare global {
  interface Window {
    YT: YouTubeAPI;
    onYouTubeIframeAPIReady: () => void;
  }
}

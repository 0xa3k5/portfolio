import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";
import Button from "../button";

interface PlayerControlsProps {
  playing: boolean;
  muted: boolean;
  volume: number;
  current: number;
  duration: number;
  zoom?: number;
  onPlayPause: () => void;
  onMute: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeek: (newTime: number) => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  playing,
  muted,
  volume,
  current,
  duration,
  zoom = 1,
  onPlayPause,
  onMute,
  onSeek,
  onSkipBackward,
  onSkipForward,
  onVolumeChange,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleTimelineClick(e);
  };

  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const handleTimelineMouseUp = () => {
    setIsDragging(false);
  };

  const progressPercentage = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex flex-col gap-2">
        {/* Timeline */}
        <div
          ref={timelineRef}
          className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative"
          onClick={handleTimelineClick}
          onMouseDown={handleTimelineMouseDown}
          onMouseMove={handleTimelineMouseMove}
          onMouseUp={handleTimelineMouseUp}
          onMouseLeave={handleTimelineMouseUp}
        >
          <div
            className="h-full bg-daisy rounded-full transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 size-4 bg-white outline outline-midnight/20 rounded-full shadow-lg"
            style={{ left: `calc(${progressPercentage}% - 6px)` }}
          />
        </div>

        <div className="flex items-center gap-4 text-white">
          {/* Play/Pause */}
          <Button
            onClick={onPlayPause}
            variant="secondary"
            iconOnly
            className="p-2 hover:bg-white/20 rounded transition-colors"
          >
            {playing ? (
              <PauseIcon className="size-6 text-foam" />
            ) : (
              // <svg width="24" height="24" fill="currentColor">
              //   <rect x="6" y="5" width="4" height="14" />
              //   <rect x="14" y="5" width="4" height="14" />
              // </svg>
              <PlayIcon className="size-6 text-foam" />
              // <svg width="24" height="24" fill="currentColor">
              //   <polygon points="6,4 20,12 6,20" />
              // </svg>
            )}
          </Button>

          {/* Skip Backward */}
          <button
            onClick={onSkipBackward}
            className="p-2 hover:bg-white/20 rounded transition-colors"
            title="Skip -5 seconds"
          >
            <svg width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 5-5v10zm8 0l-5-5 5-5v10z" />
            </svg>
          </button>

          {/* Skip Forward */}
          <button
            onClick={onSkipForward}
            className="p-2 hover:bg-white/20 rounded transition-colors"
            title="Skip +5 seconds"
          >
            <svg width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 15l5-5-5-5v10zm-8 0l5-5-5-5v10z" />
            </svg>
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={onMute}
            className="p-2 hover:bg-white/20 rounded transition-colors"
          >
            {muted ? (
              <svg width="24" height="24" fill="currentColor">
                <polygon points="11,5 6,9 6,15 11,19 11,5" />
                <line
                  x1="19"
                  y1="5"
                  x2="5"
                  y2="19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg width="24" height="24" fill="currentColor">
                <polygon points="11,5 6,9 6,15 11,19 11,5" />
                <path
                  d="M15 9a4 4 0 0 1 0 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <svg width="16" height="16" fill="currentColor">
              <polygon points="11,5 6,9 6,15 11,19 11,5" />
              <path
                d="M15 9a4 4 0 0 1 0 6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={onVolumeChange}
              className="w-20 accent-blue-500"
            />
          </div>

          {/* Time */}
          <span className="text-sm tabular-nums min-w-[80px]">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          {/* Zoom Controls */}
          {onZoomIn && onZoomOut && onZoomReset && (
            <div className="flex items-center gap-1 border-l border-white/20 pl-4">
              <button
                onClick={onZoomOut}
                className="p-2 hover:bg-white/20 rounded transition-colors"
                title="Zoom Out"
              >
                <svg width="20" height="20" fill="currentColor">
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
              </button>

              <span className="text-xs px-2 text-white/70 min-w-[40px] text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                onClick={onZoomIn}
                className="p-2 hover:bg-white/20 rounded transition-colors"
                title="Zoom In"
              >
                <svg width="20" height="20" fill="currentColor">
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
              </button>

              <button
                onClick={onZoomReset}
                className="p-2 hover:bg-white/20 rounded transition-colors text-xs"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;

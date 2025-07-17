"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface VideoContextType {
  activeVideoId: string | null;
  playVideo: (videoId: string) => void;
  pauseVideo: (videoId: string) => void;
  stopAllVideos: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

interface VideoProviderProps {
  children: ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const playVideo = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  const pauseVideo = (videoId: string) => {
    if (activeVideoId === videoId) {
      setActiveVideoId(null);
    }
  };

  const stopAllVideos = () => {
    setActiveVideoId(null);
  };

  const value: VideoContextType = {
    activeVideoId,
    playVideo,
    pauseVideo,
    stopAllVideos,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

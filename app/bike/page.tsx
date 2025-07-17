"use client";
import { useState, useEffect } from "react";
import { VideoProvider } from "@/src/hooks/use-video-context";
import BikeVideoCard from "@/src/components/bike-video-card";
import { SectionTitle } from "@/src/components/section-title";
import PasswordWall from "@/src/components/password-wall";
import { BikeVideo } from "@/src/types";

export default function BikePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videos, setVideos] = useState<BikeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authenticated = sessionStorage.getItem("bikeAuthenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/bike-videos");
      if (response.ok) {
        const data = await response.json();
        const sortedVideos = data.sort(
          (a: BikeVideo, b: BikeVideo) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setVideos(sortedVideos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("bikeAuthenticated", "true");
    fetchVideos();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight">
        <div className="text-foam">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasswordWall onSuccess={handleAuthSuccess} />;
  }

  return (
    <VideoProvider>
      <div className="flex flex-col gap-16 my-40">
        <SectionTitle
          title="Bike Adventures"
          subtext="learnings from the mistakes I make on my bike"
          orientation="vertical"
        />

        <div className="flex flex-col gap-12 w-full sm:max-w-6xl mx-auto px-4">
          {videos.map((video) => (
            <BikeVideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </VideoProvider>
  );
}

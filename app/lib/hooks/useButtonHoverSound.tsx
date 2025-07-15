"use client";

import { useState, useEffect } from "react";
import useSound from "use-sound";
import { useTheme } from "../contexts/ThemeContext";

const getRandomInt = () => {
  return Math.floor(Math.random() * 4);
};

export const useButtonHoverSound = () => {
  const { volume } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [sprite, setSprite] = useState(2);

  // Initialize useSound with proper error handling - simplified without sprites first
  const [play, { pause, stop }] = useSound("/sounds/pop.mp3", {
    volume: 0.05,
    interrupt: true,
    soundEnabled: isClient,
    onloaderror: (error) => {
      console.warn("Failed to load sound:", error);
    },
    onplayerror: (error) => {
      console.warn("Failed to play sound:", error);
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const playSound = () => {
    if (volume && isClient && play) {
      try {
        play();
        setSprite(getRandomInt());
      } catch (error) {
        console.warn("Failed to play sound:", error);
      }
    }
  };

  return { playSound, pause, stop };
};

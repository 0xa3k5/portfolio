import { useState } from "react";
import useSound from "use-sound";
import { useTheme } from "../contexts/ThemeContext";

const getRandomInt = () => {
  return Math.floor(Math.random() * 4);
};

export const useButtonHoverSound = () => {
  const { volume } = useTheme();
  const [play, { pause, stop }] = useSound("/sounds/pop.mp3", {
    sprite: {
      0: [90, 80],
      1: [700, 200],
      2: [1460, 210],
      3: [2000, 160],
    },
    volume: 0.1,
  });
  const [sprite, setSprite] = useState(2);

  const playSound = () => {
    if (volume) play({ id: sprite.toString() }), setSprite(getRandomInt());
  };

  return { playSound, pause, stop };
};

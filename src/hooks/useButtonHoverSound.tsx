import { useState } from "react";
import useSound from "use-sound";
import { useTheme } from "../contexts/ThemeContext";

const getRandomInt = () => {
  return Math.floor(Math.random() * 5);
};

export const useButtonHoverSound = () => {
  const { volume } = useTheme();
  const [play, { pause, stop }] = useSound("/sounds/whoops.mp3", {
    sprite: {
      0: [500, 120],
      1: [1760, 200],
      2: [3330, 210],
      3: [4840, 160],
      4: [7520, 230],
    },
    volume: 0.15,
  });
  const [sprite, setSprite] = useState(2);

  const playSound = () => {
    if (volume) play({ id: sprite.toString() }), setSprite(getRandomInt());
  };

  return { playSound, pause, stop };
};

import { useTheme } from "../../contexts/ThemeContext";
import { VolumeOff, VolumeOn } from "../../icons";
import useSound from "use-sound";
import Button from "../Button";
import { useState, useEffect } from "react";

export default function VolumeSwitcher() {
  const { volume, setVolume } = useTheme();
  const [isClient, setIsClient] = useState(false);

  const [play] = useSound(
    volume ? "/sounds/dial-down.mp3" : "/sounds/dial-up.mp3",
    {
      volume: 0.2,
      soundEnabled: isClient,
      onloaderror: (error) => {
        console.warn("Failed to load volume sound:", error);
      },
      onplayerror: (error) => {
        console.warn("Failed to play volume sound:", error);
      },
    }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVolumeSwitch = () => {
    setVolume(!volume);
    if (isClient && play) {
      try {
        play();
      } catch (error) {
        console.warn("Failed to play volume sound:", error);
      }
    }
  };

  return (
    <Button.Icon key={"volumeBtn"} isActive onClick={handleVolumeSwitch}>
      {volume ? <VolumeOn filled /> : <VolumeOff filled />}
    </Button.Icon>
  );
}

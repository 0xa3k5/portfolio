import { useTheme } from "../../contexts/ThemeContext";
import { VolumeOff, VolumeOn } from "../../icons";
import useSound from "use-sound";
import Button from "../Button";

export default function VolumeSwitcher() {
  const { volume, setVolume } = useTheme();
  const [play] = useSound(
    volume ? "/sounds/dial-down.mp3" : "/sounds/dial-up.mp3",
    { volume: 0.5 }
  );

  const handleVolumeSwitch = () => {
    setVolume(!volume);
    play();
  };

  return (
    <Button.Icon isActive onClick={handleVolumeSwitch}>
      {volume ? <VolumeOn filled /> : <VolumeOff filled />}
    </Button.Icon>
  );
}

import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { VolumeOff, VolumeOn } from "../../icons";
import useSound from "use-sound";

interface VolumeSwitcherProps {
  className?: string;
}

export default function VolumeSwitcher({ className }: VolumeSwitcherProps) {
  const { getThemeClasses, volume, setVolume } = useTheme();
  const themeClasses = getThemeClasses();
  const [play] = useSound(
    volume ? "/sounds/volume-off.mp3" : "/sounds/volume-on.mp3"
  );

  const handleVolumeSwitch = () => {
    play();
    setVolume(!volume);
  };

  return (
    <button
      className={cx(
        "group relative flex flex-col items-center gap-2 rounded-xl duration-150",
        themeClasses.color,
        className
      )}
      onClick={handleVolumeSwitch}
    >
      {volume ? <VolumeOn filled /> : <VolumeOff filled />}
    </button>
  );
}

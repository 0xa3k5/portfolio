import { useTheme } from "../../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "../../icons";
import useSound from "use-sound";
import Button from "../Button";

export default function ThemeSwitcher() {
  const { volume, theme, setTheme } = useTheme();
  const [play] = useSound(
    theme === "dark" ? "/sounds/switch-on.mp3" : "/sounds/switch-off.mp3",
    { volume: 0.5 }
  );

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    volume && play();
  };

  return (
    <Button.Icon isActive onClick={handleThemeSwitch}>
      {theme === "dark" ? (
        <MoonIcon filled className="h-6 w-6" />
      ) : (
        <SunIcon filled className="h-6 w-6" />
      )}
    </Button.Icon>
  );
}

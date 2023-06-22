import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "../../icons";
import useSound from "use-sound";

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [play] = useSound(
    theme === "dark" ? "/sounds/switch-on.mp3" : "/sounds/switch-off.mp3"
  );

  const handleThemeSwitch = () => {
    play();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className={cx(
        "group relative flex flex-col items-center gap-2 rounded-xl duration-150",
        themeClasses.color,
        className
      )}
      onClick={handleThemeSwitch}
    >
      {theme === "dark" ? <MoonIcon filled /> : <SunIcon filled />}
    </button>
  );
}

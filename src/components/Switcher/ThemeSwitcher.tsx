import { useTheme } from "../../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "../../icons";
import useSound from "use-sound";
import Button from "../Button";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const { volume, theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  
  const [play] = useSound(
    theme === "dark" ? "/sounds/switch-on.mp3" : "/sounds/switch-off.mp3",
    { 
      volume: 0.2,
      soundEnabled: isClient,
      onloaderror: (error) => {
        console.warn("Failed to load theme sound:", error);
      },
      onplayerror: (error) => {
        console.warn("Failed to play theme sound:", error);
      },
    }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    if (volume && isClient && play) {
      try {
        play();
      } catch (error) {
        console.warn("Failed to play theme sound:", error);
      }
    }
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

import { darkTheme, dimTheme, lightTheme } from "../constants/theme-classes";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-4 py-2 md:flex-col">
      <button
        className={`${darkTheme.bg} ${
          theme === "dark" ? "h-6 w-6 border-2 border-opacity-40" : "h-4 w-4"
        } rounded-full duration-150 ${darkTheme.border}`}
        onClick={() => setTheme("dark")}
      />
      <button
        className={`${lightTheme.bg} ${
          theme === "light" ? "h-6 w-6 border-2 border-opacity-40" : "h-4 w-4"
        } rounded-full duration-150 ${lightTheme.border}`}
        onClick={() => setTheme("light")}
      />
      <button
        className={`${dimTheme.bg} ${
          theme === "dim" ? "h-6 w-6 border-2 border-opacity-40" : "h-4 w-4"
        } rounded-full duration-150 ${dimTheme.border}`}
        onClick={() => setTheme("dim")}
      />
    </div>
  );
}

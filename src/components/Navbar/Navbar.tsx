import Button from "../Button";
import { useTheme } from "../../contexts/ThemeContext";

export default function Navbar(): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div className="fixed bottom-0 left-0 z-20 mb-4 flex w-full justify-center md:hidden">
      <div
        className={`flex gap-4 rounded-2xl border duration-200 hover:bg-opacity-100 ${themeClasses.border} border-opacity-20 ${themeClasses.bg} items-center bg-opacity-80 px-4 py-2 backdrop-blur-lg`}
      >
        <nav className="flex md:gap-4">
          <Button.Navigation href="/" name="Home" />
          <Button.Navigation href="/about" name="About" />
          <Button.Navigation href="/works" name="Works" />
          <Button.Navigation href="/ak-resume.pdf" name="Resume" />
        </nav>
      </div>
    </div>
  );
}

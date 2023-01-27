import cx from "classnames";
import Logo from "../Logo";

import HamburgerIcon from "../../../public/icons/hamburger.svg";
import CloseIcon from "../../../public/icons/close.svg";

import { useAppContext } from "../../../hooks/useAppContext";
import Navigation from "./Navigation";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps): JSX.Element {
  const { theme, isNavbarOpen, setIsNavbarOpen } = useAppContext();

  return (
    <div className="fixed top-0 z-20 w-screen bg-opacity-10 backdrop-blur-lg">
      <nav
        className={cx(
          className,
          "container flex py-4 px-8 duration-200 lg:items-center lg:justify-between lg:py-6 lg:px-16",
          isNavbarOpen ? "h-screen " : "h-fit"
        )}
        style={{ color: `#${theme.color}` }}
      >
        <Logo
          className="w-12 lg:w-full"
          onClick={() => setIsNavbarOpen(false)}
        />
        <Navigation.Desktop />
        <Navigation.Mobile />
        <button
          className="inline-block h-fit lg:hidden"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          {isNavbarOpen ? (
            <CloseIcon className="w-8 lg:w-10" />
          ) : (
            <HamburgerIcon className="w-8 lg:w-10" />
          )}
        </button>
      </nav>
    </div>
  );
}

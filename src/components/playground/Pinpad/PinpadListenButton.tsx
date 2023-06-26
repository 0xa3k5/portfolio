import cx from "classnames";
import { useTheme } from "../../../contexts/ThemeContext";
import { Replay } from "../../../icons";

interface PinpadListenButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function PinpadListenButton({
  onClick,
  disabled,
}: PinpadListenButtonProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "flex w-full justify-between rounded-lg border border-opacity-10 bg-opacity-5 px-8 py-4 text-xl duration-150 hover:bg-opacity-10 disabled:pointer-events-none disabled:border-opacity-5 disabled:bg-opacity-[.03] disabled:text-opacity-40",
        themeClasses.bgInverse,
        themeClasses.border,
        themeClasses.color
      )}
    >
      Listen
      <Replay />
    </button>
  );
}

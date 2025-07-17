import { CrossRect, EnterRect } from "@/src/components/icons";
import { cx } from "@/src/utils/cx";

interface PinpadButtonProps {
  onClick: () => void;
  className?: string;
  value: string;
  disabled: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const PinpadButton: React.FC<PinpadButtonProps> = ({
  onClick,
  className,
  value,
  disabled,
  onMouseEnter,
  onMouseLeave,
}) => {
  const keyMappings: { [key: string]: string | React.ReactNode } = {
    X: <CrossRect />,
    Enter: <EnterRect />,
  };

  const child = keyMappings[value] || value;

  return (
    <button
      type="button"
      className={cx(
        "col-span-1 flex items-center justify-center rounded-lg border p-4 text-3xl font-extrabold duration-150 disabled:opacity-40",
        disabled ? "pointer-events-none" : "pointer-events-auto",
        "bg-[#00FF85]/0.05 hover:bg-[#00FF85]/0.2",
        "border-[#00FF85]/0.2 hover:border-[#00FF85]/0.6",
        "text-[#00FF85]",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {child}
    </button>
  );
};

export default PinpadButton;

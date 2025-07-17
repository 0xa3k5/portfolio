import { cx } from "@/src/utils/cx";

interface PinpadInputProps {
  inputValue: string;
  onClick?: () => void;
  canListen: boolean;
}

export const PinpadInput = ({
  inputValue,
  canListen,
  onClick,
}: PinpadInputProps) => {
  return (
    <button
      onClick={onClick}
      disabled={!canListen || inputValue.length === 0}
      className={cx(
        "flex h-16 w-full items-center justify-center rounded-lg border  px-4 py-6 text-center text-4xl duration-150 disabled:pointer-events-none",
        "bg-foam/5 hover:bg-foam/10 border-foam/10 text-[#00FF85]",
        "disabled:border-foam/5 disabled:bg-opacity-[.03] disabled:text-foam/50",
        inputValue && inputValue.length > 1 ? "tracking-[1rem]" : "tracking-[0]"
      )}
    >
      {inputValue}
    </button>
  );
};

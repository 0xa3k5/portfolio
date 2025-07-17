import { ReplayIcon } from "@/src/components/icons";

interface PinpadListenButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const PinpadListenButton = ({
  onClick,
  disabled,
}: PinpadListenButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        flex w-full justify-between rounded-lg px-8 py-4 text-xl duration-150 disabled:pointer-events-none ,
        bg-foam/5 hover:bg-foam/10  disabled:bg-opacity-[.03]
        border border-foam/10 disabled:border-opacity-5
        text-foam disabled:text-foam/50
        `}
    >
      Listen
      <ReplayIcon />
    </button>
  );
};

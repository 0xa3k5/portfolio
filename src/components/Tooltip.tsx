interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  return (
    <div className="absolute left-0 top-0 -translate-y-1/2 translate-x-4 transform whitespace-nowrap rounded-full bg-shark px-4 py-2 text-sm text-white">
      {text}
    </div>
  );
}

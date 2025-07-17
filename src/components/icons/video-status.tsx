interface VideoStatusIconProps {
  status: "+" | "-";
  className?: string;
}

export const VideoStatusIcon = ({
  status,
  className = "",
}: VideoStatusIconProps) => {
  if (status === "+") {
    return (
      <svg
        className={`w-6 h-6 text-green-400 ${className}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    );
  }

  return (
    <svg
      className={`w-6 h-6 text-red-400 ${className}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
  );
};

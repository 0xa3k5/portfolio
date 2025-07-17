import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const ReplayIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 6.99988V16.9999m-5-6v2M12 2.99988V20.9999m5-14.00002V16.9999m5-6v2"
      />
    </svg>
  );
};

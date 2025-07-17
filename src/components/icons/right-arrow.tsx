import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const RightArrowIcon: React.FC<Props> = ({ className, ...props }) => {
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
        d="M20 11.996c0 .26-.11.511-.304.695l-5.553 5.507c-.22.21-.448.302-.685.302-.54 0-.93-.377-.93-.889 0-.268.11-.494.28-.662l1.9-1.91 2.452-2.222-1.96.118H4.954c-.566 0-.955-.386-.955-.94 0-.544.389-.93.955-.93H15.2l1.961.118-2.451-2.221-1.902-1.911a.919.919 0 0 1-.279-.663c0-.51.39-.888.93-.888.237 0 .465.092.668.285l5.57 5.524a.957.957 0 0 1 .304.687Z"
        fill="currentColor"
      />
    </svg>
  );
};

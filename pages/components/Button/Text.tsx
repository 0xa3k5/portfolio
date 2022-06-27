import cx from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';

interface TextProps {
  className?: string;
  href: string;
  text: string;
  icon?: ReactNode;
  targetBlank?: boolean;
  onClick?: any;
}

export default function Text({
  className,
  text,
  onClick,
  icon,
}: TextProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={cx(
        'flex gap-2 rounded-full text-lg text-polar duration-200 items-center',
        className
      )}
    >
      {text}
      {icon}
    </button>
  );
}

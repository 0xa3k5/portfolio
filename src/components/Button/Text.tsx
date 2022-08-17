import cx from 'classnames';
import { ReactNode } from 'react';

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
        'flex items-center gap-2 rounded-full text-lg text-polar duration-200',
        className
      )}
    >
      {text}
      {icon}
    </button>
  );
}

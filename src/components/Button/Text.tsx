import cx from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';

interface TextProps {
  className?: string;
  href: string;
  text: string;
  icon?: ReactNode;
  targetBlank?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
        'flex items-center space-x-2 hover:text-daisy rounded-full text-lg duration-200',
        className
      )}
    >
      {text && text}
      {icon && icon}
    </button>
  );
}

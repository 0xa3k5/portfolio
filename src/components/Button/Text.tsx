import cx from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';

interface TextProps {
  className?: string;
  href: string;
  text: string;
  icon?: ReactNode;
  targetBlank?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Text({
  className,
  text,
  icon,
  href,
  targetBlank = true,
  onClick,
}: TextProps): JSX.Element {
  return (
    <a
      href={href}
      target={targetBlank && '_blank'}
      rel={targetBlank && 'noreferrer'}
      onClick={onClick}
      className={cx(
        'flex items-center space-x-2 rounded-full duration-200 hover:text-daisy',
        className
      )}
    >
      {text && text}
      {icon && icon}
    </a>
  );
}

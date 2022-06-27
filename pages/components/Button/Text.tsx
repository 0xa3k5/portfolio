import cx from 'classnames';
import { ReactNode } from 'react';

interface TextProps {
  className?: string;
  href: string;
  text: string;
  icon?: ReactNode;
  targetBlank?: boolean;
}

export default function Text({
  className,
  text,
  href,
  icon,
  targetBlank = false,
}: TextProps): JSX.Element {
  return (
    <a
      href={href}
      target={targetBlank && '_blank'}
      rel={targetBlank && 'noreferrer'}
    >
      <button
        className={cx(
          'flex gap-2 rounded-full text-lg text-polar duration-200 items-center',
          className
        )}
      >
        {text}
        {icon}
      </button>
    </a>
  );
}

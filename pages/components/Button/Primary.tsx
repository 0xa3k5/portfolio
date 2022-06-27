import cx from 'classnames';
import { ReactNode } from 'react';

interface PrimaryProps {
  className?: string;
  href: string;
  text?: string;
  icon?: ReactNode;
  targetBlank?: boolean;
}

export default function Primary({
  className,
  text,
  href,
  icon,
  targetBlank = false,
}: PrimaryProps): JSX.Element {
  return (
    <a
      href={href}
      target={targetBlank && '_blank'}
      rel={targetBlank && 'noreferrer'}
    >
      <button
        className={cx(
          'flex gap-2 rounded-full text-lg text-polar border border-opacity-0 border-woodBlue hover:border-opacity-100 bg-stoneBlue duration-200 items-center',
          text ? 'py-4 px-8' : 'p-4',
          className
        )}
      >
        {text && text}
        {icon && icon}
      </button>
    </a>
  );
}

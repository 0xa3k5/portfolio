import cx from 'classnames';
import { ReactNode } from 'react';

interface GhostProps {
  className?: string;
  text?: string;
  href: string;
  icon?: ReactNode;
  targetBlank?: boolean;
}

export default function Ghost({
  className,
  text,
  href,
  icon,
  targetBlank = false,
}: GhostProps): JSX.Element {
  return (
    <a
      href={href}
      target={targetBlank ? '_blank' : undefined}
      rel={'noreferrer'}
    >
      <button
        className={cx(
          'flex gap-2 rounded-xl text-casper hover:text-polar uppercase  tracking-widest text-sm border border-opacity-0 border-woodBlue hover:border-opacity-100 hover:bg-stoneBlue duration-200 items-center',
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

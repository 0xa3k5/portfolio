import cx from 'classnames';
import { ReactNode } from 'react';

interface GhostProps {
  className?: string;
  text?: string;
  href: string;
  icon?: ReactNode;
  targetBlank?: boolean;
  color: string;
}

export default function Ghost({
  className,
  text,
  href,
  icon,
  targetBlank = false,
  color,
}: GhostProps): JSX.Element {
  return (
    <a
      href={href}
      target={targetBlank ? '_blank' : undefined}
      rel={'noreferrer'}
    >
      <button
        className={cx(
          'flex items-center space-x-2 rounded-xl text-sm uppercase tracking-widest duration-200 hover:text-polar',
          text ? 'py-4 px-8' : 'p-4',
          `text-[#${color}] bg-[#${color}] bg-opacity-0 hover:bg-opacity-60`,
          className
        )}
      >
        {text && text}
        {icon && icon}
      </button>
    </a>
  );
}

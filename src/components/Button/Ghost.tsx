import cx from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';

interface GhostProps {
  className?: string;
  text?: string;
  href: string;
  icon?: ReactNode;
  color: string;
}

export default function Ghost({
  className,
  text,
  href,
  icon,
  color,
}: GhostProps): JSX.Element {
  return (
    <Link href={href}>
      <button
        className={cx(
          'flex items-center space-x-2 rounded-xl text-sm uppercase tracking-widest duration-200 hover:text-white',
          text ? 'py-4 px-8' : 'p-4',
          `text-[#${color}] bg-[#${color}] bg-opacity-0 hover:bg-opacity-60`,
          className
        )}
      >
        {text && text}
        {icon && icon}
      </button>
    </Link>
  );
}

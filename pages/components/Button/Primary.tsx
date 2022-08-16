import cx from 'classnames';
import { ReactNode } from 'react';

interface PrimaryProps {
  className?: string;
  href?: string;
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
      target={targetBlank ? '_blank' : undefined}
      rel={'noreferrer'}
    >
      <button
        className={cx(
          'flex items-center gap-2 rounded-full border border-woodBlue text-sm uppercase tracking-widest text-polar duration-200',
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

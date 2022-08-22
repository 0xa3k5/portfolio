import cx from 'classnames';
import { ReactNode } from 'react';
import Link from 'next/link';

interface TextProps {
  className?: string;
  href: string;
  text: string;
  icon?: ReactNode;
}

export default function Text({
  className,
  text,
  icon,
  href,
}: TextProps): JSX.Element {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className={cx(
        'flex items-center space-x-2 rounded-full text-lg duration-200 hover:text-daisy',
        className
      )}
    >
      {text && text}
      {icon && icon}
    </a>
  );
}

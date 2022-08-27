import cx from 'classnames';
import { MouseEventHandler } from 'react';

interface TextProps {
  className?: string;
  href: string;
  text: string;
  targetBlank?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Text({
  className,
  text,
  href,
  targetBlank = true,
  onClick,
}: TextProps): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={href}
      target={targetBlank ? '_blank' : ''}
      rel={targetBlank ? 'noreferrer' : ''}
      onClick={onClick}
      className={cx(
        'flex items-center space-x-2 rounded-full duration-200 hover:text-daisy',
        className
      )}
    >
      {text && text}
    </a>
  );
}

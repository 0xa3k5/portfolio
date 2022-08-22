import cx from 'classnames';
import { ReactNode, useState } from 'react';
import { hexToRGB } from '../../utils/hexToRGB';

interface PrimaryProps {
  className?: string;
  href: string;
  text: string;
  icon?: ReactNode;
  targetBlank?: boolean;
  color?: string;
  bgColor?: string;
}

export default function Primary({
  className,
  text,
  href,
  icon,
  targetBlank = false,
  color = 'ffffff',
  bgColor = '000000',
}: PrimaryProps): JSX.Element {
  const [hover, setHover] = useState(false);

  const textRgb = hexToRGB(color);
  const bgRgb = hexToRGB(bgColor);

  return (
    <a
      href={href}
      target={targetBlank ? '_blank' : undefined}
      rel={'noreferrer'}
    >
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cx(
          'group flex w-full items-center justify-center rounded-xl py-4 px-0 text-sm uppercase tracking-widest duration-200 md:py-4 md:px-8 lg:w-fit',
          className
        )}
        style={{
          color: hover ? `rgb(${bgRgb})` : `rgba(${textRgb})`,
          backgroundColor: hover ? `rgba(${textRgb})` : `rgba(${textRgb},0.2)`,
        }}
      >
        {text}
        {icon && icon}
      </button>
    </a>
  );
}

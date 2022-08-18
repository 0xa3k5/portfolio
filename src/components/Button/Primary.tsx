import cx from 'classnames';
import { ReactNode, useState } from 'react';
import { a11yColorPicker } from '../../utils/a11yColorPicker';
import { hexToRGB } from '../../utils/hexToRGB';

interface PrimaryProps {
  className?: string;
  href?: string;
  text?: string;
  icon?: ReactNode;
  targetBlank?: boolean;
  color: string;
  bgColor: string;
}

export default function Primary({
  className,
  text,
  href,
  icon,
  targetBlank = false,
  color,
  bgColor,
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
          'flex items-center space-x-4 rounded-xl text-sm uppercase tracking-widest duration-200 hover:text-polar',
          text ? 'py-4 px-8' : 'p-4',
          className
        )}
        style={{
          color: hover ? `rgb(${bgRgb})` : `rgba(${textRgb})`,
          backgroundColor: hover ? `rgba(${textRgb})` : `rgba(${textRgb},0.2)`,
        }}
      >
        {text && text}
        {icon && icon}
      </button>
    </a>
  );
}

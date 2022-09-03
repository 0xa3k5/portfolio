import cx from 'classnames';
import { ReactNode, useState } from 'react';
import { hexToRGB } from '../../utils/hexToRGB';
import Link from 'next/link';

interface PrimaryProps {
  className?: string;
  text: string;
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
  href: string;
}

export default function Primary({
  className,
  text,
  icon,
  color = 'ffffff',
  bgColor = '000000',
  href,
}: PrimaryProps): JSX.Element {
  const [hover, setHover] = useState(false);

  const textRgb = hexToRGB(color);
  const bgRgb = hexToRGB(bgColor);

  return (
    <Link href={href} passHref scroll={false}>
      <a
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <button
          className={cx(
            'group flex w-full md:w-fit items-center justify-center rounded-xl py-4 px-8 text-lg duration-200',
            className
          )}
          style={{
            color: hover ? `rgb(${bgRgb})` : `rgba(${textRgb})`,
            backgroundColor: hover
              ? `rgba(${textRgb})`
              : `rgba(${textRgb},0.2)`,
          }}
        >
          {text}
          {icon && icon}
        </button>
      </a>
    </Link>
  );
}

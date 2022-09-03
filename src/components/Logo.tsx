import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';

interface LogoProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Logo({ className, onClick }: LogoProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Link href='/' className={className} passHref scroll={false}>
      <a
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        <h2 className='font-vollkorn text-3xl font-bold duration-200 md:text-4xl'>
          <span className='duration-200'>a</span>
          <span
            className={`${
              hover ? 'opacity-100' : '-ml-2 opacity-0'
            } duration-200`}
          >
            li
          </span>
          <span className={`${hover ? '' : '-ml-4 md:-ml-5'} duration-200`}>
            k
          </span>
          <span
            className={`${
              hover ? 'ml-0 opacity-100' : '-ml-8 opacity-0'
            } duration-200`}
          >
            emal
          </span>
        </h2>
      </a>
    </Link>
  );
}

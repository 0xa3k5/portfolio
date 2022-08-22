import Link from 'next/link';
import { useState } from 'react';

export default function Logo(): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Link href='/' passHref>
      <a
        className=''
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2 className='font-bogart text-4xl font-bold duration-200'>
          <span className='duration-200'>a</span>
          <span
            className={`${
              hover ? 'opacity-100' : '-ml-8 opacity-0'
            } duration-200`}
          >
            li
          </span>
          <span className={`${hover ? 'ml-2' : 'ml-2'} duration-200`}>k</span>
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

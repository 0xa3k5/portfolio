import cx from 'classnames';
import Button from '../Button';
import Logo from '../Logo';

import HamburgerIcon from '../../../public/icons/hamburger.svg';
import CloseIcon from '../../../public/icons/close.svg';
import LinkedinIcon from '../../../public/socials/linkedin.svg';
import TwitterIcon from '../../../public/socials/twitter.svg';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

interface HeaderProps {
  className?: string;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
  isNavbarOpen: boolean;
  color?: string;
}

export default function Header({
  className,
  setIsNavbarOpen,
  isNavbarOpen,
  color = 'fff',
}: HeaderProps): JSX.Element {
  const navList = [
    {
      text: 'About',
      href: '/about',
      targetBlank: false,
    },
    {
      text: 'Twitter',
      href: 'https://twitter.com/akemalakcay',
      targetBlank: true,
    },
    {
      text: 'LinkedIn',
      href: 'https://linkedin.com/in/alikemalakcay/',
      targetBlank: true,
    },
    {
      text: 'Resume',
      href: '/akresume.pdf',
      targetBlank: true,
    },
    {
      text: 'hey@akml.io',
      href: 'mailto:hey@akml.io',
      targetBlank: true,
    },
  ];

  return (
    <div
      className={cx(
        className,
        'fixed top-0 z-20 w-full bg-midnight py-4 px-4 duration-200 md:py-6 md:px-16',
        isNavbarOpen
          ? 'bg-opacity-0 backdrop-blur-none'
          : 'bg-opacity-10 backdrop-blur-lg'
      )}
    >
      <nav
        className='container flex items-center justify-between'
        style={{ color: `#${color}` }}
      >
        <Logo onClick={() => setIsNavbarOpen(false)} />
        <ul className='hidden items-center space-x-12 lg:flex'>
          {navList.map(({ text, href, targetBlank }) => (
            <li className='text-sm uppercase tracking-widest' key={href}>
              <Button.Text text={text} href={href} targetBlank={targetBlank} />
            </li>
          ))}
        </ul>
        <button
          className='block lg:hidden'
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          {isNavbarOpen ? (
            <CloseIcon className='w-8 md:w-10' />
          ) : (
            <HamburgerIcon className='w-8 md:w-10' />
          )}
        </button>
      </nav>
    </div>
  );
}

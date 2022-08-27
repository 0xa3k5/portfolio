import { PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import Button from '../Button';

interface MobileMenuProps {
  className?: string;
  isNavbarOpen: boolean;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({
  isNavbarOpen,
  setIsNavbarOpen,
}: PropsWithChildren<MobileMenuProps>): JSX.Element {
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
      text: 'Linkedin',
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
    <motion.nav
      initial={false}
      animate={isNavbarOpen ? 'open' : 'closed'}
      className={`fixed top-0 left-0 z-10 flex h-screen w-full items-center justify-center bg-midnight backdrop-blur-lg transition-all duration-200 lg:hidden ${
        isNavbarOpen
          ? '-translate-x-0 bg-opacity-80'
          : 'translate-x-full bg-opacity-0'
      }
      `}
    >
      <motion.ul
        variants={motionVariants.navUl}
        className='flex flex-col items-center space-y-16'
      >
        {navList.map((l, i) => (
          <motion.li
            className='text-lg uppercase tracking-widest text-white lg:text-xl'
            key={i}
            variants={motionVariants.navLi}
          >
            <Button.Text
              text={l.text}
              href={l.href}
              targetBlank={l.targetBlank}
              onClick={() => setIsNavbarOpen(false)}
            />
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
}

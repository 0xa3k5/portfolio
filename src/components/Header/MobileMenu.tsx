import { PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import Button from '../Button';
import { hexToRGB } from '../../utils/hexToRGB';

interface MobileMenuProps {
  className?: string;
  isNavbarOpen: boolean;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
  color?: string;
  bgColor?: string;
}

export default function MobileMenu({
  isNavbarOpen,
  setIsNavbarOpen,
  color = '000000',
  bgColor = 'ffffff',
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
      className={`fixed top-0 left-0 z-10 flex h-screen w-full items-center justify-center backdrop-blur-lg transition-all duration-200 lg:hidden ${
        isNavbarOpen
          ? '-translate-x-0 bg-opacity-80'
          : 'translate-x-full bg-opacity-0'
      }
      `}
      style={{
        color: `#${color}`,
        backgroundColor: `rgba(${hexToRGB(bgColor)}, 0.6)`,
      }}
    >
      <motion.ul
        variants={motionVariants.navUl}
        className='flex flex-col items-center space-y-16'
      >
        {navList.map((l, i) => (
          <motion.li
            className='text-lg uppercase tracking-widest lg:text-xl'
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

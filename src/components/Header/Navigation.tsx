import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import Button from '../Button';
import { Dispatch, SetStateAction } from 'react';

interface NavigationProps {
  className: string;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navigation({
  setIsNavbarOpen,
}: NavigationProps): JSX.Element {
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
    <motion.ul
      variants={motionVariants.navUl}
      className='flex flex-col items-center space-y-16 text-xl uppercase tracking-widest'
    >
      {navList.map((l, i) => (
        <motion.li className='' key={i} variants={motionVariants.navLi}>
          <Button.Text
            text={l.text}
            href={l.href}
            targetBlank={l.targetBlank}
            onClick={(e) => {
              e.preventDefault();
              setIsNavbarOpen(false);
            }}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}

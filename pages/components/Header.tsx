import cx from 'classnames';
import Link from 'next/link';
import Button from '../components/Button';

import NewTabIcon from '../../public/icons/new-tab.svg';
import TwitterIcon from '../../public/socials/twitter.svg';
import LinkedinIcon from '../../public/socials/linkedin.svg';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps): JSX.Element {
  return (
    <div className={cx('container flex justify-between py-12', className)}>
      <Link href='/' passHref>
        <a className='hover:-translate-y-2 duration-300'>
          <img
            src='/akpfp.png'
            alt='Ali Kemal Akcay'
            className='w-16 h-16 rounded-full'
          />
        </a>
      </Link>
      <div className='flex space-x-1'>
        <Button.Ghost
          href='https://twitter.com/akemalakcay'
          icon={<TwitterIcon className='w-7' />}
          targetBlank
        />
        <Button.Ghost
          href='https://linkedin.com/in/alikemalakcay/'
          icon={<LinkedinIcon className='w-7' />}
          targetBlank
        />
        <Button.Ghost
          text='Resume'
          href='/akresume.pdf'
          icon={<NewTabIcon className='w-7' />}
          targetBlank
        />
        <Button.Ghost
          text='Email Me'
          href='mailto:a.kemalakcay@gmail.com'
          targetBlank
        />
      </div>
    </div>
  );
}

import cx from 'classnames';
import Link from 'next/link';
import Button from '../components/Button';
import AKLogo from '../../public/ak-logo.svg';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps): JSX.Element {
  return (
    <div className={cx('flex justify-between py-12', className)}>
      <Link href='/' passHref>
        <a className='hover:-translate-y-2 duration-300'>
          <AKLogo className='w-16 h-16 rounded-full' />
        </a>
      </Link>
      <div className='flex space-x-1'>
        <Button.Ghost
          href='https://twitter.com/akemalakcay'
          text='Twitter'
          targetBlank
        />
        <Button.Ghost
          href='https://linkedin.com/in/alikemalakcay/'
          text='Linkedin'
          targetBlank
        />
        <Button.Ghost
          text='Resume'
          href='/akresume.pdf'
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

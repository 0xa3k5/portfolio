import cx from 'classnames';
import Link from 'next/link';
import Button from './Button';
import Logo from './Logo';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps): JSX.Element {
  return (
    <div className={cx('flex justify-between py-12', className)}>
      <Logo />
      <div className='flex space-x-12'>
        <Link href='/about' passHref>
          <a className='flex items-center space-x-2 rounded-full text-lg duration-200 hover:text-daisy'>
            About
          </a>
        </Link>
        <Button.Text href='https://twitter.com/akemalakcay' text='Twitter' />
        <Button.Text
          href='https://linkedin.com/in/alikemalakcay/'
          text='Linkedin'
        />
        <Button.Text text='Resume' href='/akresume.pdf' />
        <Button.Text text='hey@akml.io' href='mailto:hey@akml.io' />
      </div>
    </div>
  );
}

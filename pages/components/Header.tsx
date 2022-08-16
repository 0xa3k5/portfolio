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
        <a className='duration-300 hover:-translate-y-2'>
          <AKLogo className='h-16 w-16 rounded-full' />
        </a>
      </Link>
      <Link href='/about' passHref>
        <a className='duration-300 hover:-translate-y-2'>About</a>
      </Link>
      <div className='flex space-x-1'>
        <Button.Text
          href='https://twitter.com/akemalakcay'
          text='Twitter'
          targetBlank
        />
        <Button.Text
          href='https://linkedin.com/in/alikemalakcay/'
          text='Linkedin'
          targetBlank
        />
        <Button.Text text='Resume' href='/akresume.pdf' targetBlank />
        <Button.Text
          text='Email Me'
          href='mailto:a.kemalakcay@gmail.com'
          targetBlank
        />
      </div>
    </div>
  );
}

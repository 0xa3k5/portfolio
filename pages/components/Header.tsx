import cx from 'classnames';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps): JSX.Element {
  return <div className={cx('container flex justify-between space-x-12 py-12 items-center', className)}>
    <img src="/akpfp.png" alt="Ali Kemal Akcay" className='w-16 h-16 rounded-full' />
    <div className='flex space-x-8 text-lg'>
        <p>Resume</p>
        <p>Contact</p>
    </div>
  </div>;
}

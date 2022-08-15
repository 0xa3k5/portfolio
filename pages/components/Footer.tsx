import cx from 'classnames';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps): JSX.Element {
  return (
    <div className={cx('container flex justify-center py-12', className)}>
      <span className='text-2xl'>❤️</span>
    </div>
  );
}

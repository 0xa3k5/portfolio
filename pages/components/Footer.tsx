import cx from 'classnames';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps): JSX.Element {
  return (
    <div className={cx('container py-12 flex justify-center', className)}>
      <span className='text-2xl'>❤️</span>
    </div>
  );
}

import cx from 'classnames';
import Button from '../Button';

interface CTAProps {
  className?: string;
  title: string;
  desc?: string;
}

export default function CTA({ className, title, desc }: CTAProps): JSX.Element {
  return (
    <div className={cx(className, 'container flex h-screen justify-center')}>
      <div className='flex max-w-md flex-col items-center justify-center space-y-4 text-center'>
        <h4 className='text-center font-bogart text-5xl font-semibold'>
          {title}
        </h4>
        <p className='text-lg font-normal leading-loose opacity-80'>{desc}</p>
        <Button.Text href='' text='Shoot me an email' />
      </div>
    </div>
  );
}

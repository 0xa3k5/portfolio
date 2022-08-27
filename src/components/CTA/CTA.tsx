import cx from 'classnames';
import Button from '../Button';

interface CTAProps {
  className?: string;
  title?: string;
  desc?: string;
}

export default function CTA({
  className,
  title = "Let's build something together",
  desc = 'I help startups with product design, design critics, QA testing and design advisory.',
}: CTAProps): JSX.Element {
  return (
    <div className={cx(className, 'container flex h-screen justify-center')}>
      <div className='flex flex-col items-center justify-center space-y-8 text-center'>
        <h4 className='max-w-xl text-center font-alegreya text-5xl font-semibold'>
          {title}
        </h4>
        <p className='max-w-md text-lg font-normal leading-loose opacity-80'>
          {desc}
        </p>
        <Button.Primary href='mailto:hey@akml.io' text='Shoot me an email' />
      </div>
    </div>
  );
}

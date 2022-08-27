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
    <div
      className={cx(
        className,
        'container flex h-screen justify-center px-4 md:px-0'
      )}
    >
      <div className='flex flex-col items-center justify-center space-y-4 text-center md:space-y-8'>
        <h4 className='max-w-xl text-center font-lora text-3xl font-semibold md:text-5xl'>
          {title}
        </h4>
        <p className='max-w-md font-normal leading-loose opacity-80 md:text-lg'>
          {desc}
        </p>
        <Button.Primary href='mailto:hey@akml.io' text='Shoot me an email' />
      </div>
    </div>
  );
}

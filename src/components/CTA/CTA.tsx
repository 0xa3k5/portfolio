import cx from 'classnames';
import Button from '../Button';

interface CTAProps {
  className?: string;
  title?: string;
  desc?: string;
}

export default function CTA({
  className,
  title = "Let's build something together!",
  desc = 'I help startups with product design, design critics, QA testing and design advisory.',
}: CTAProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        'flex h-[70vh] items-center justify-center px-4 md:px-0'
      )}
    >
      <div className='flex flex-col justify-center space-y-6 md:items-center md:space-y-8 md:text-center'>
        <h4 className='max-w-xl font-vollkorn text-4xl font-semibold md:text-5xl'>
          {title}
        </h4>
        <p className='max-w-sm text-xl font-normal opacity-80'>{desc}</p>
        <Button.Primary href='mailto:hey@akml.io' text='Shoot me an email' />
      </div>
    </div>
  );
}

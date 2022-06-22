import cx from 'classnames';

interface PortfolioCardProps {
  className?: string;
  title: string;
  period: string;
  description: string;
  imgSrc: string;
}

export default function PortfolioCard({
  className,
  title,
  period,
  description,
  imgSrc,
}: PortfolioCardProps): JSX.Element {
  return (
    <div
      className={cx(
        'rounded-xl border border-casper border-opacity-20 overflow-hidden',
        className
      )}
    >
      <img src={`/${imgSrc}`} alt={title} className='w-full max-h-80' />
      <div className='flex p-12 flex-col space-y-4'>
        <h6 className='text-lg tracking-wide'>{period}</h6>
        <h4 className='text-3xl font-semibold'>{title}</h4>
        <p className='text-lg text-casper'>{description}</p>
      </div>
    </div>
  );
}

import cx from 'classnames';
import { PortfolioPost } from '../api/schema';
import Link from 'next/link';

interface PortfolioCardProps {
  className?: string;
  portfolioPost: PortfolioPost;
}

export default function PortfolioCard({
  portfolioPost,
  className,
}: PortfolioCardProps): JSX.Element {
  return (
    <Link href={`/portfolio/${portfolioPost.slug}`} passHref>
      <div
        className={cx(
          'rounded-xl border border-casper border-opacity-20 overflow-hidden',
          className
        )}
      >
        <img src={portfolioPost.img} alt={portfolioPost.title} className='w-full max-h-80' />
        <div className='flex p-12 flex-col space-y-4'>
          <h6 className='text-lg tracking-wide'>{portfolioPost.period}</h6>
          <h4 className='text-3xl font-semibold'>{portfolioPost.title}</h4>
          <p className='text-lg text-casper'>{portfolioPost.description}</p>
        </div>
      </div>
    </Link>
  );
}

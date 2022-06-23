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
    <div className='flex space-x-8 items-start'>
      <a href='' target='_blank'>
        <img
          src={portfolioPost.logo}
          className='rounded-xl w-16 h-16 mt-2'
          alt={portfolioPost.title}
        />
      </a>
      <Link href={`/portfolio/${portfolioPost.slug}`} passHref>
        <a className='hover:-translate-y-3 hover:bg-darkPearl duration-200'>
          <div
            className={cx(
              'max-w-4xl rounded-xl border border-woodBlue overflow-hidden h-full',
              className
            )}
          >
            <img
              src={portfolioPost.img}
              alt={portfolioPost.title}
              className='w-full max-h-96'
            />
            <div className='flex p-12 flex-col space-y-4'>
              <h6 className='text-lg tracking-wide'>{portfolioPost.period}</h6>
              <h4 className='text-3xl font-semibold hover:text-daisy duration-200'>
                {portfolioPost.title}
              </h4>
              <p className='text-lg text-casper'>{portfolioPost.description}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

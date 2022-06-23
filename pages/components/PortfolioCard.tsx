import cx from 'classnames';
import { PortfolioPost } from '../api/schema';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className='hover:-translate-y-1 duration-200'>
        <a href={portfolioPost.website} target='_blank' rel='noreferrer'>
          <Image
            src={portfolioPost.logo}
            alt={portfolioPost.title}
            width={64}
            height={64}
            className='rounded-xl'
          />
        </a>
      </div>
      <Link href={`/portfolio/${portfolioPost.slug}`} passHref>
        <a className='hover:-translate-y-3 hover:bg-darkPearl duration-200'>
          <div
            className={cx(
              'max-w-4xl rounded-xl border border-woodBlue overflow-hidden h-full',
              className
            )}
          >
            <div className='w-full h-96 relative'>
              <Image
                src={portfolioPost.img}
                alt={portfolioPost.title}
                layout='fill'
                objectFit='fill'
                priority
              />
            </div>
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

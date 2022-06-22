import cx from 'classnames';
import { PortfolioPost } from '../api/schema';
import Link from 'next/link';

interface PortfolioCardProps {
  className?: string;
  post: PortfolioPost;
}

export default function PortfolioCard({
  post,
  className,
}: PortfolioCardProps): JSX.Element {
  return (
    <Link href={`/portfolio/${post.slug}`} passHref>
      <div
        className={cx(
          'rounded-xl border border-casper border-opacity-20 overflow-hidden',
          className
        )}
      >
        <img src={post.img} alt={post.title} className='w-full max-h-80' />
        <div className='flex p-12 flex-col space-y-4'>
          <h6 className='text-lg tracking-wide'>{post.period}</h6>
          <h4 className='text-3xl font-semibold'>{post.title}</h4>
          <p className='text-lg text-casper'>{post.description}</p>
        </div>
      </div>
    </Link>
  );
}

import cx from 'classnames';
import { Post } from '../../../@types/schema';
import Link from 'next/link';

interface FooterProps {
  className?: string;
  post: Post;
}

export default function Footer({ className, post }: FooterProps): JSX.Element {
  return (
    <div
      className={cx(
        'flex w-full space-x-24 uppercase tracking-widest',
        className
      )}
    >
      <div className='flex flex-col space-y-4'>
        <p className='text-xs opacity-60'>Client</p>
        <Link href={post.website} passHref>
          <a className='duration-200 hover:text-daisy'>
            <span className='text-sm'>{post.client}</span>
          </a>
        </Link>
      </div>
      <div className='flex flex-col space-y-4'>
        <p className='text-xs opacity-60'>Year</p>
        <span className='text-sm'>{post.period}</span>
      </div>
    </div>
  );
}

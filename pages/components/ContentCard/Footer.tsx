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
        'flex space-x-24 w-full uppercase tracking-widest',
        className
      )}
    >
      <div className='flex flex-col space-y-4'>
        <p className='text-casper text-xs'>Client</p>
        <Link href={post.website} passHref>
          <a className='hover:text-daisy duration-200'>
            <span className='text-sm'>{post.client}</span>
          </a>
        </Link>
      </div>
      <div className='flex flex-col space-y-4'>
        <p className='text-casper text-xs'>Period</p>
        <span className='text-sm'>{post.period}</span>
      </div>
    </div>
  );
}

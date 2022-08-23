import cx from 'classnames';
import Link from 'next/link';
import { NotionPost } from '../../../@types/schema';

import LeftArrowPlain from '../../../public/icons/left-arrow-plain.svg';
import RightArrowPlain from '../../../public/icons/right-arrow-plain.svg';

interface MorePostsProps {
  className?: string;
  posts: NotionPost[];
}

export default function MorePosts({
  className,
  posts,
}: MorePostsProps): JSX.Element {
  return (
    <div
      className={cx(
        'flex flex-col space-y-24 space-x-0 px-4 py-24 md:flex-row md:space-y-0 md:space-x-24',
        className
      )}
    >
      <Link href={`/works/${posts[0].slug}`}>
        <div className='group flex-1 hover:cursor-pointer hover:text-daisy'>
          <div className='flex flex-col space-y-4'>
            <div className='flex space-x-2 text-white text-opacity-40 duration-200 group-hover:text-opacity-100'>
              <LeftArrowPlain className='w-6 duration-200 group-hover:-translate-x-1/2' />
              <p className='text-md uppercase tracking-widest'>Previous</p>
            </div>
            <h6 className='max-w-sm font-bogart text-3xl font-medium leading-snug'>
              {posts[0].title}
            </h6>
          </div>
        </div>
      </Link>
      <Link href={`/works/${posts[1].slug}`}>
        <div className='group flex-1 hover:cursor-pointer hover:text-daisy'>
          <div className='flex flex-col items-end space-y-4'>
            <div className='flex space-x-2 text-white text-opacity-40 duration-200 group-hover:text-opacity-100'>
              <p className='text-md uppercase tracking-widest'>Next</p>
              <RightArrowPlain className='w-6 duration-200 group-hover:translate-x-1/2' />
            </div>
            <h6 className='max-w-sm text-right font-bogart text-3xl font-medium leading-snug'>
              {posts[1].title}
            </h6>
          </div>
        </div>
      </Link>
    </div>
  );
}

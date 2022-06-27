import cx from 'classnames';
import { Post } from '../../../@types/schema';
import Link from 'next/link';
import Image from 'next/image';
import Footer from './Footer';
import Button from '../Button';

import NewTabIcon from '../../../public/icons/new-tab.svg';

interface FullProps {
  className?: string;
  post: Post;
  type: 'career' | 'side-projects';
}

export default function Full({
  post,
  className,
  type,
}: FullProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        'flex space-x-8 min-h-[800px] bg-stoneBlue rounded-xl w-full justify-end'
      )}
    >
      <div className='flex flex-1 flex-col pt-24 pb-16 pl-24 justify-between'>
        <div className='flex flex-col space-y-6'>
          <h4 className='text-4xl font-semibold'>{post.title}</h4>
          <p className='text-lg text-casper'>{post.description}</p>
          <Button.Text
            href={`/${type}/${post.slug}`}
            targetBlank
            text='Read More'
            className='group'
            icon={
              <NewTabIcon className='w-5 group-hover:translate-x-1 group-hover:-translate-y-1 duration-200' />
            }
          />
        </div>
        <Footer post={post} />
      </div>
      <div className='flex-1'>
        <div className='relative rounded-xl overflow-hidden w-full h-full'>
          <Image
            src={post.img}
            alt={post.title}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
      </div>
    </div>
  );
}

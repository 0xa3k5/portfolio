import cx from 'classnames';
import { Post } from '../../../@types/schema';
import Link from 'next/link';
import Image from 'next/image';
import Footer from './Footer';
import Button from '../Button';

import NewTabIcon from '../../../public/icons/new-tab.svg';

interface HorizontalProps {
  className?: string;
  post: Post;
  type: 'career' | 'side-projects';
}

export default function Horizontal({
  post,
  className,
  type,
}: HorizontalProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        'flex space-x-8 min-h-[800px] rounded-xl p-24 w-full'
      )}
    >
      <div className='relative mt-5 w-10 h-10 hover:-translate-y-1 duration-200'>
        <a href={post.website} target='_blank' rel='noreferrer'>
          <Image
            src={post.logo}
            alt={post.title}
            layout='fill'
            className='rounded-md'
            priority
          />
        </a>
      </div>
      <div className='flex flex-1 flex-col pt-4 pr-16 justify-between'>
        <div className='flex flex-col space-y-6'>
          <h4 className='text-3xl font-semibold'>{post.title}</h4>
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
        <Link href={`/${type}/${post.slug}`} passHref>
          <a className='hover:-translate-y-3 duration-200'>
            <div className='relative h-full rounded-xl overflow-hidden w-full'>
              <Image
                src={post.img}
                alt={post.title}
                layout='fill'
                objectFit='contain'
                priority
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

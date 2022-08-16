import cx from 'classnames';
import { NotionPost } from '../../../@types/schema';
import Image from 'next/image';
import Button from '../Button';

import RightArrowCircleIcon from '../../../public/icons/right-arrow-circle.svg';

interface HorizontalProps {
  className?: string;
  post: NotionPost;
}

export default function Horizontal({
  post,
  className,
}: HorizontalProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        'container flex h-screen items-center space-x-32 pl-32'
      )}
      style={{ color: `#${post.color}` }}
    >
      <div className='flex max-w-md flex-col'>
        <h6 className='text-md mb-8 uppercase tracking-widest opacity-60'>
          {post.period}
        </h6>
        <div className='relative mb-12 h-8 w-32'>
          <Image
            src={post.logo}
            alt={`${post.client} logo`}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
        <div className='mb-8 flex flex-col space-y-4'>
          <h4 className='font-bogart text-4xl font-semibold'>{post.title}</h4>
          <p className='text-lg font-normal leading-loose opacity-80'>
            {post.description}
          </p>
        </div>
        <Button.Ghost
          href={`/career/${post.slug}`}
          color={post.color}
          text='Read More'
          className={`group hover:bg-[#${post.color}] duration-200`}
          icon={
            <RightArrowCircleIcon className='w-6 duration-200 group-hover:translate-x-1' />
          }
        />
      </div>
      <div className='relative h-4/6 flex-1 rounded-xl'>
        <Image
          src={post.img}
          alt={post.title}
          layout='fill'
          objectFit='contain'
          objectPosition='right center'
          priority
        />
      </div>
    </div>
  );
}

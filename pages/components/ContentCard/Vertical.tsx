import cx from 'classnames';
import { NotionPost } from '../../../@types/schema';
import Image from 'next/image';
import Button from '../Button';

import RightArrowCircleIcon from '../../../public/icons/right-arrow-circle.svg';

interface VerticalProps {
  className?: string;
  post: NotionPost;
}

export default function Vertical({
  post,
  className,
}: VerticalProps): JSX.Element {
  return (
    <div
      className={cx(className, 'container flex h-screen flex-col items-center')}
      style={{ color: `#${post.color}` }}
    >
      <div className='flex max-w-xl flex-col items-center space-y-4 py-12 px-16'>
        <h6 className='text-md mb-2 text-center uppercase tracking-widest opacity-60'>
          {post.period}
        </h6>
        <div className='relative mb-8 h-8 w-32'>
          <Image
            src={post.logo}
            alt={`${post.client} logo`}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
        <div className='mb-8 flex flex-col space-y-4 text-center'>
          <h4 className='font-bogart text-4xl font-semibold'>{post.title}</h4>
          <p className='text-lg font-normal leading-loose opacity-80'>
            {post.description}
          </p>
        </div>
        <Button.Ghost
          href={`/works/${post.slug}`}
          color={post.color}
          text='Read More'
          className='group duration-200 hover:bg-woodBlue'
          icon={
            <RightArrowCircleIcon className='w-6 duration-200 group-hover:translate-x-1' />
          }
        />
      </div>
      <div className='relative w-full flex-1 rounded-xl'>
        <Image
          src={post.img}
          alt={post.title}
          layout='fill'
          objectFit='contain'
          objectPosition='center'
          priority
        />
      </div>
    </div>
  );
}

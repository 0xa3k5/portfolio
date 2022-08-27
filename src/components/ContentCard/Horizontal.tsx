import cx from 'classnames';
import { NotionPost } from '../../../@types/schema';
import Image from 'next/image';
import Button from '../Button';

import RightArrowCircleIcon from '../../../public/icons/right-arrow-circle.svg';
import LockIcon from '../../../public/icons/lock.svg';

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
        'container flex h-screen snap-center flex-col items-center justify-center space-x-0 px-4 pt-8 pb-0 md:flex-row md:space-y-0 md:space-x-32 md:px-8 md:py-16 md:pt-0 xl:px-0'
      )}
      style={{ color: `#${post.properties.color}` }}
    >
      <div className='flex h-fit max-w-full flex-col items-center md:max-w-md md:items-start'>
        <h6 className='text-md mb-2 text-center uppercase tracking-widest opacity-60 md:mb-8 md:text-left'>
          {post.details.period}
        </h6>
        <div className='relative mb-4 h-8 w-24 md:mb-12 md:h-8 md:w-32'>
          <Image
            src={post.org.logo}
            alt={`${post.org.orgName} logo`}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
        <div className='mb-4 flex flex-col space-y-2 text-center md:mb-8 md:space-y-4 md:text-left'>
          <h4 className='font-lora text-3xl font-semibold md:text-4xl'>
            {post.details.title}
          </h4>
          <p className='text-sm font-normal opacity-80 md:text-lg md:leading-loose'>
            {post.details.description}
          </p>
        </div>
        <Button.Primary
          href={`/works/${post.properties.slug}`}
          color={post.properties.color}
          bgColor={post.properties.bgColor}
          text='View Case Study'
          className='mb-4 md:mb-0'
          icon={
            post.properties.password ? (
              <LockIcon className='ml-1 w-6' />
            ) : (
              <RightArrowCircleIcon className='ml-1 w-6 duration-200 group-hover:translate-x-1' />
            )
          }
        />
      </div>
      <div className='relative h-1/3 w-full rounded-xl md:h-full md:w-1/2 md:max-w-full'>
        <Image
          src={post.details.img}
          alt={post.details.title}
          layout='fill'
          objectFit='contain'
          objectPosition='right right'
          priority
        />
      </div>
    </div>
  );
}

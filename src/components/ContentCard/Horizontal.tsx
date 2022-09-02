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
      <div className='flex w-full flex-col items-center md:max-w-md md:items-start'>
        <h6 className='text-md mb-2 text-center font-lato uppercase tracking-widest opacity-80 md:mb-6 md:text-left'>
          {post.details.period}
        </h6>
        <div className='relative mb-6 h-8 w-24 md:mb-8 md:h-8 md:w-32'>
          <Image
            src={post.org.logo}
            alt={`${post.org.orgName} logo`}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
        <div className='mb-6 flex flex-col items-center space-y-4 text-center md:mb-8 md:items-start md:text-left'>
          <h4 className='font-vollkorn text-3xl font-semibold md:text-4xl'>
            {post.details.title}
          </h4>
          <p className='max-w-sm text-lg font-normal opacity-80 md:text-xl md:leading-snug'>
            {post.details.description}
          </p>
        </div>
        <Button.Primary
          href={`/works/${post.properties.slug}`}
          color={post.properties.color}
          bgColor={post.properties.bgColor}
          text='View Case Study'
          className='mb-4 w-[80vw] sm:w-full md:mb-0'
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

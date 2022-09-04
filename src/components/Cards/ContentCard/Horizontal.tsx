import cx from 'classnames';
import { NotionPost } from '../../../../@types/schema';
import Image from 'next/image';
import Button from '../../Button';

import RightArrowCircleIcon from '../../../../public/icons/right-arrow-circle.svg';
import LockIcon from '../../../../public/icons/lock.svg';

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
        'container flex h-screen flex-col-reverse items-center justify-center gap-8 px-6 md:h-[90vh] md:flex-row md:gap-16 md:px-12 xl:px-0 xl:justify-between'
      )}
      style={{ color: `#${post.properties.color}` }}
    >
      <div className='flex flex-col space-y-4 md:max-w-md md:space-y-6'>
        <h6 className='font-muli text-sm uppercase tracking-widest opacity-80'>
          {post.details.period}
        </h6>
        <div className='relative h-6 w-20 lg:h-8 lg:w-28'>
          <Image
            src={post.org.logo}
            alt={`${post.org.orgName} logo`}
            layout='fill'
            objectFit='contain'
            priority
            unoptimized
          />
        </div>
        <div className='flex max-w-md flex-col items-center space-y-1 md:space-y-4 lg:items-start'>
          <h4 className='font-vollkorn text-3xl font-semibold md:text-4xl'>
            {post.details.title}
          </h4>
          <p className='text-lg font-normal opacity-80 lg:text-xl lg:leading-snug'>
            {post.details.description}
          </p>
        </div>
        <Button.Primary
          href={`/works/${encodeURIComponent(post.properties.slug)}`}
          color={post.properties.color}
          bgColor={post.properties.bgColor}
          text='View Case Study'
          icon={
            post.properties.password ? (
              <LockIcon className='ml-1 w-6' />
            ) : (
              <RightArrowCircleIcon className='ml-1 w-6 duration-200 group-hover:translate-x-1' />
            )
          }
        />
      </div>
      <div className='relative h-1/3 w-full rounded-xl md:h-1/2 md:w-1/2'>
        <Image
          src={post.details.img}
          alt={post.details.title}
          layout='fill'
          objectFit='contain'
          objectPosition='right right'
          priority
          unoptimized
        />
      </div>
    </div>
  );
}

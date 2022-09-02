import cx from 'classnames';
import { NotionPost } from '../../../@types/schema';
import Image from 'next/image';
import Button from '../Button';

import RightArrowCircleIcon from '../../../public/icons/right-arrow-circle.svg';
import LockIcon from '../../../public/icons/lock.svg';

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
      className={cx(
        className,
        'container flex h-screen snap-center flex-col items-center justify-center'
      )}
      style={{ color: `#${post.properties.color}` }}
    >
      <div className='flex max-w-md flex-col items-center text-center'>
        <h6 className='text-md mb-4 uppercase tracking-widest opacity-60 md:mb-8'>
          {post.details.period}
        </h6>
        <div className='relative mb-6 h-8 w-32 md:mb-12'>
          <Image
            src={post.org.logo}
            alt={`${post.org.orgName} logo`}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
        <div className='mb-4 flex flex-col space-y-2 md:space-y-4 md:text-center'>
          <h4 className='font-vollkorn text-3xl font-semibold md:text-4xl'>
            {post.details.title}
          </h4>
          <p className='font-normal opacity-80 md:text-lg md:leading-loose'>
            {post.details.description}
          </p>
        </div>
        <Button.Primary
          href={`/works/${post.properties.slug}`}
          color={post.properties.color}
          bgColor={post.properties.bgColor}
          text='View Case Study'
          className='mb-8'
          icon={
            post.properties.password ? (
              <LockIcon className='ml-1 w-6' />
            ) : (
              <RightArrowCircleIcon className='ml-1 w-6 duration-200 group-hover:translate-x-1' />
            )
          }
        />
      </div>
      <div className='relative h-1/3 w-full rounded-xl md:h-1/2 lg:w-full lg:max-w-full'>
        <Image
          src={post.details.img}
          alt={post.details.title}
          layout='fill'
          objectFit='contain'
          objectPosition='center center'
          priority
        />
      </div>
    </div>
  );
}

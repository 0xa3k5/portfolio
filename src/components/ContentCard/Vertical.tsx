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
        'container flex h-screen flex-col items-center justify-center gap-6 px-6 md:flex-col-reverse md:gap-16'
      )}
      style={{ color: `#${post.properties.color}` }}
    >
      <div className='relative h-1/3 w-full rounded-xl md:h-1/3 md:w-1/2'>
        <Image
          src={post.details.img}
          alt={post.details.title}
          layout='fill'
          objectFit='contain'
          priority
        />
      </div>
      <div className='flex flex-col space-y-4 md:items-center md:space-y-6 md:text-center '>
        <h6 className='text-md uppercase tracking-widest opacity-60'>
          {post.details.period}
        </h6>
        <div className='relative h-8 w-32'>
          <Image
            src={post.org.logo}
            alt={`${post.org.orgName} logo`}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
        <div className='flex flex-col space-y-2 md:max-w-lg md:space-y-4 md:text-center'>
          <h4 className='font-vollkorn text-3xl font-semibold md:text-4xl'>
            {post.details.title}
          </h4>
          <p className='font-normal opacity-80 md:text-lg'>
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
    </div>
  );
}

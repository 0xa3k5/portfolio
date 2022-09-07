import cx from 'classnames';
import { NotionPost } from '../../../../@types/schema';
import Image from 'next/image';
import Button from '../../Button';

import RightArrowCircleIcon from '../../../../public/icons/right-arrow-circle.svg';

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
        'container flex h-[95vh] flex-col-reverse items-center justify-center gap-16 px-6 md:flex-row md:px-12 xl:justify-between xl:px-24'
      )}
      style={{
        color: `#${post.properties.color}`,
      }}
    >
      <div className='flex max-w-xs md:max-w-md flex-col items-center space-y-4 text-center md:items-start md:space-y-6 md:text-left'>
        <span className='text-sm uppercase tracking-widest opacity-80'>
          {post.details.period} – {post.org.orgName}
        </span>
        <h3 className='text-3xl font-semibold md:text-4xl xl:text-5xl'>
          {post.details.title}
        </h3>
        <Button.Primary
          href={`/works/${encodeURIComponent(post.properties.slug)}`}
          color={post.properties.color}
          bgColor={post.properties.bgColor}
          text='View Case Study'
          icon={<RightArrowCircleIcon />}
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

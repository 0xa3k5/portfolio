import cx from 'classnames';
import { NotionPost } from '../../../../@types/schema';
import { useState } from 'react';
import Image from 'next/image';

interface SideProjectCardProps {
  className?: string;
  post: NotionPost;
  text: string;
}

export default function SideProjectCard({
  className,
  post,
  text,
}: SideProjectCardProps): JSX.Element {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={cx(
        className,
        'rounded-xl bg-white bg-opacity-5 duration-200 overflow-clip'
      )}
      style={{
        backgroundColor: isHover && `#${post.properties.bgColor}`,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* <div className='relative min-h-full w-full'>
        <Image
          src={post.details.img}
          alt=''
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div> */}
      <div className=''>
        <h3
          className='max-w-sm text-4xl font-semibold leading-snug'
          style={{ color: isHover && `#${post.properties.color}` }}
        >
          {text}
          <br /> {post.details.title}
        </h3>
      </div>
    </div>
  );
}

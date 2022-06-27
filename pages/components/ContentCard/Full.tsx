import cx from 'classnames';
import { Post } from '../../../@types/schema';
import Image from 'next/image';
import Footer from './Footer';
import Button from '../Button';

import RightArrowCircleIcon from '../../../public/icons/right-arrow-circle.svg';

interface FullProps {
  className?: string;
  post: Post;
  type: 'career' | 'side-projects';
}

export default function Full({
  post,
  className,
  type,
}: FullProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        'flex space-x-8 min-h-[800px] bg-stoneBlue rounded-xl w-full justify-end'
      )}
    >
      <div className='flex flex-1 flex-col pt-24 pb-16 px-24 justify-between'>
        <div className='flex flex-col space-y-8'>
          <h4 className='text-4xl font-semibold'>{post.title}</h4>
          <p className='text-lg text-casper leading-loose'>{post.description}</p>
          <Button.Primary
            href={`/${type}/${post.slug}`}
            targetBlank
            text='Read More'
            className='group hover:bg-woodBlue duration-200'
            icon={
              <RightArrowCircleIcon className='w-6 group-hover:translate-x-1 duration-200' />
            }
          />
        </div>
        <Footer post={post} />
      </div>
      <div className='w-1/2'>
        <div className='relative rounded-xl overflow-hidden w-full h-full'>
          <Image
            src={post.img}
            alt={post.title}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
      </div>
    </div>
  );
}

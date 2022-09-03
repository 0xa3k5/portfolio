import cx from 'classnames';
import { NotionPost } from '../../@types/schema';
import Image from 'next/image';
import Header from './Header/Header';
import MobileMenu from './Header/MobileMenu';
import { Dispatch, SetStateAction } from 'react';

interface PostHeroProps {
  className?: string;
  post: NotionPost;
  isNavbarOpen: boolean;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
  color?: string;
}

export default function PostHero({
  className,
  post,
  isNavbarOpen,
  setIsNavbarOpen,
  color,
}: PostHeroProps): JSX.Element {
  return (
    <>
      <Header
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        color={color ?? post.properties.color}
      />
      <MobileMenu
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        color={color ?? post.properties.color}
        bgColor={post.properties.bgColor}
      />
      <div
        className={cx(
          className,
          'mb:pb-8 flex h-[80vh] flex-col items-center justify-end px-6 pb-4 md:gap-12 md:px-0'
        )}
        style={{
          backgroundColor: `#${post.properties.bgColor}`,
          color: `#${post.properties.color}`,
        }}
      >
        <div className='flex max-w-lg flex-col items-center space-y-2 md:space-y-4 '>
          <h1 className='text-center font-vollkorn text-4xl font-bold md:text-5xl md:leading-snug'>
            {post.details.title}
          </h1>
          <p className='max-w-md text-center font-normal opacity-80 md:text-xl md:leading-loose'>
            {post.details.description}
          </p>
        </div>
        <div className='relative h-2/5 w-1/2'>
          <Image
            src={post.details.img}
            alt={post.details.title}
            layout='fill'
            objectFit='contain'
            priority
            unoptimized
          />
        </div>
      </div>
    </>
  );
}

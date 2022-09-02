/* eslint-disable @next/next/no-img-element */
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
}

export default function PostHero({
  className,
  post,
  isNavbarOpen,
  setIsNavbarOpen,
}: PostHeroProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        'flex h-[90vh] flex-col items-center justify-end space-y-4'
      )}
      style={{
        backgroundColor: `#${post.properties.bgColor}`,
        color: `#${post.properties.color}`,
      }}
    >
      <Header
        className='fixed top-0'
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />
      <MobileMenu
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />
      <div
        className={cx(
          className,
          'container mt-24 flex flex-col items-center space-y-12 space-x-0 pt-24'
        )}
      >
        <div className='relative h-8 w-48'>
          <Image
            src={post.org.logo}
            alt={`${post.org.orgName} logo`}
            layout='fill'
            objectFit='contain'
            objectPosition='bottom'
            priority
          />
        </div>
        <div className='flex max-w-2xl flex-col items-center space-y-2 md:space-y-8 '>
          <h1 className='text-center font-vollkorn text-4xl font-bold md:text-5xl md:leading-snug'>
            {post.details.title}
          </h1>
          <p className='max-w-lg text-center font-normal opacity-80 md:text-xl md:leading-loose'>
            {post.details.description}
          </p>
        </div>
      </div>
      <div className='relative h-2/5 w-full'>
        <Image
          src={post.details.img}
          alt={post.details.title}
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  );
}

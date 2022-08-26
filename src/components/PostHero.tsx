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
      className={cx(className, 'flex h-screen items-center justify-center')}
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
          'container mt-24 flex flex-col items-center space-y-16 space-x-0 py-8 px-8 md:py-32 md:px-0'
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
        <div className='mb-4 flex max-w-2xl flex-col space-y-2 md:mb-8 md:space-y-4 '>
          <h1 className='text-center font-bogart text-4xl font-bold md:text-5xl'>
            {post.details.title}
          </h1>
          <p className='text-center font-normal opacity-80 md:text-xl md:leading-loose'>
            {post.details.description}
          </p>
        </div>
      </div>
    </div>
  );
}

import cx from 'classnames';
import { Post } from '../../@types/schema';
import Link from 'next/link';
import Image from 'next/image';

interface ContentCardProps {
  className?: string;
  post: Post;
  type: 'career' | 'side-projects'
}

export default function ContentCard({
  post,
  className,
  type
}: ContentCardProps): JSX.Element {
  return (
    <div className='flex space-x-8 items-start'>
      <div className='hover:-translate-y-1 duration-200'>
        <a href={post.website} target='_blank' rel='noreferrer'>
          <Image
            src={post.logo}
            alt={post.title}
            width={64}
            height={64}
            className='rounded-xl'
          />
        </a>
      </div>
      <Link href={`/${type}/${post.slug}`} passHref>
        <a className='hover:-translate-y-3 hover:bg-darkPearl duration-200'>
          <div
            className={cx(
              'max-w-4xl rounded-xl border border-woodBlue overflow-hidden h-full',
              className
            )}
          >
            <div className='w-full h-96 relative'>
              <Image
                src={post.img}
                alt={post.title}
                layout='fill'
                objectFit='fill'
                priority
              />
            </div>
            <div className='flex p-12 flex-col space-y-4'>
              <h6 className='text-lg tracking-wide'>{post.period}</h6>
              <h4 className='text-3xl font-semibold hover:text-daisy duration-200'>
                {post.title}
              </h4>
              <p className='text-lg text-casper'>{post.description}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

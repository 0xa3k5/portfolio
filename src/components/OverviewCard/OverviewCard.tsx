import cx from 'classnames';
import Image from 'next/image';
import { NotionPost } from '../../../@types/schema';

interface OverviewCardProps {
  className?: string;
  post: NotionPost;
}

export default function OverviewCard({
  className,
  post,
}: OverviewCardProps): JSX.Element {
  return (
    <div
      className={cx(
        'flex w-10/12 rounded-2xl bg-white bg-opacity-5',
        className
      )}
    >
      <div className='flex space-x-48 p-24'>
        <div className=''>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            ORG
          </p>
          <p className='mb-8'>{post.client}</p>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Type
          </p>
          <p className='mb-8'>{post.type}</p>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Year
          </p>
          <p className='mb-8'>{post.period}</p>
        </div>
        <div className=''>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Position
          </p>
          <p className='mb-8'>{post.position}</p>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Contributions
          </p>
          <ul className='space-y-2'>
            {post.contributions.split('-').map((c, i) => {
              return (
                <li className='' key={i}>
                  {c}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='relative w-full flex-1 translate-y-8'>
        <Image
          src={post.overviewImg}
          alt={post.title}
          layout='fill'
          objectFit='contain'
          objectPosition='right right'
          priority
        />
      </div>
    </div>
  );
}

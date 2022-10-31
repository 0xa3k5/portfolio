import cx from 'classnames';
import Image from 'next/image';
import { NotionPost } from '../../../../@types/schema';

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
        'flex w-full flex-col rounded-2xl bg-white bg-opacity-5 md:w-10/12 md:flex-row',
        className
      )}
    >
      <div className='flex flex-col p-16 md:flex-row md:space-x-48 md:p-24'>
        <div className=''>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            ORG
          </p>
          <p className='mb-8 text-lg md:text-base'>{post.org.orgName}</p>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Type
          </p>
          <p className='mb-8 text-lg md:text-base'>{post.details.type}</p>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Year
          </p>
          <p className='mb-8 text-lg md:text-base'>{post.details.period}</p>
        </div>
        <div className=''>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Position
          </p>
          <p className='mb-8 text-lg md:text-base'>{post.details.position}</p>
          <p className='mb-4 text-xs uppercase tracking-widest opacity-60'>
            Contributions
          </p>
          <ul className='space-y-2'>
            {post.details.contributions.split('-').map((c, i) => {
              return (
                <li className='text-lg md:text-base' key={i}>
                  {c}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='relative w-full flex-1 translate-y-8 hidden xl:flex'>
        <Image
          src={post.details.overviewImg}
          alt={post.details.title}
          layout='fill'
          objectFit='contain'
          objectPosition='right right'
        />
      </div>
    </div>
  );
}

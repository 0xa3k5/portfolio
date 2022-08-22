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
        'flex w-10/12 justify-between rounded-2xl bg-white bg-opacity-10 py-16 px-24',
        className
      )}
    >
      <div className='flex-col space-y-2'>
        <p className='text-xs uppercase tracking-widest opacity-60'>ORG</p>
        <p className=''>{post.client}</p>
      </div>
      <div className='flex-col space-y-2'>
        <p className='text-xs uppercase tracking-widest opacity-60'>Position</p>
        <p className=''>{post.position}</p>
      </div>
      <div className='flex-col space-y-2'>
        <p className='text-xs uppercase tracking-widest opacity-60'>
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
      <div className='flex-col space-y-2'>
        <p className='text-xs uppercase tracking-widest opacity-60'>Type</p>
        <p className=''>{post.type}</p>
      </div>

      <div className='flex-col space-y-2'>
        <p className='text-xs uppercase tracking-widest opacity-60'>Year</p>
        <p className=''>{post.period}</p>
      </div>
    </div>
  );
}

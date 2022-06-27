import { WorkExp } from '../../../@types/schema';
import cx from 'classnames';

interface TakeawayCardProps {
  className?: string;
  job: WorkExp;
}

export const TakeawayCard = ({
  job,
  className,
}: TakeawayCardProps): JSX.Element => {
  return (
    <div
      className={cx(
        className,
        'flex flex-col space-y-8 px-8 py-6 rounded-xl bg-darkPearl'
      )}
    >
      <div className='flex flex-col space-y-4'>
        <h6 className='text-sm uppercase tracking-widest text-casper'>
          Takeaway
        </h6>
        <p className='leading-loose text-lg opacity-90'>{job.description}</p>
      </div>
      {job.responsibilities && (
        <div className='flex flex-col space-y-4'>
          <h6 className='text-sm uppercase tracking-widest text-casper'>
            Responsibilities
          </h6>
          <p className='leading-relaxed'>{job.responsibilities}</p>
        </div>
      )}
    </div>
  );
};

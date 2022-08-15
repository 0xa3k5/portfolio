import cx from 'classnames';
import { WorkExp } from '../../../@types/schema';
import Image from 'next/image';

interface WorkExperienceProps {
  classname?: string;
  job: WorkExp;
}

export default function WorkExperience({
  classname,
  job,
}: WorkExperienceProps): JSX.Element {
  return (
    <div className={cx(classname, 'flex')}>
      <div className='flex flex-shrink-0 flex-col items-start space-y-4'>
        <p className='text-sm uppercase tracking-widest text-casper'>
          {job.period}
        </p>
        <div className='mt-12 flex space-x-6'>
          <a
            href={job.website}
            target='_blank'
            rel='noreferrer'
            className='relative h-14 w-14 overflow-hidden rounded-lg duration-200 hover:-translate-y-1'
          >
            <Image
              src={job.logo}
              alt={job.company}
              layout='fill'
              objectFit='fill'
            />
          </a>
          <div className='flex-col space-y-2'>
            <h6 className='text-lg text-polar'>{job.company}</h6>
            <p className='font-heebo text-sm uppercase tracking-widest text-casper'>
              Company Tagline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

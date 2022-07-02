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
    <div className={cx(classname, 'flex space-between py-16')}>
      <div className='flex-1 flex space-x-4'>
        <a
          href={job.website}
          target='_blank'
          rel='noreferrer'
          className='relative rounded-lg w-14 h-14 overflow-hidden hover:-translate-y-1 duration-200'
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
          <p className='text-casper uppercase tracking-widest text-sm'>
            {job.period}
          </p>
        </div>
      </div>
      <div className='flex-1 flex flex-col space-y-4'>
        <h6 className='text-lg text-polar'>{job.role}</h6>
        <span className='text-casper leading-relaxed'>{job.description}</span>
      </div>
    </div>
  );
}

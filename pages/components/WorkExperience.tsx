import cx from 'classnames';
import { WorkExp } from '../../@types/schema';
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
    <div className={cx('flex space-x-8 w-full', classname)}>
      <a
        href={job.website}
        target='_blank'
        rel='noreferrer'
        className='relative rounded-xl w-16 h-16 min-w-16 min-h-16 overflow-hidden hover:-translate-y-1 duration-200'
      >
        <Image
          src={job.logo}
          alt={job.company}
          layout='fill'
          objectFit='fill'
        />
      </a>
      <div className='flex flex-col space-y-4'>
        <p className='text-polar text-md tracking-wide uppercase'>
          {job.period}
        </p>
        <h6 className='text-2xl text-polar'>
          {job.company} – {job.role}
        </h6>
        <p className='text-lg text-casper leading-relaxed'>{job.description}</p>
      </div>
    </div>
  );
}

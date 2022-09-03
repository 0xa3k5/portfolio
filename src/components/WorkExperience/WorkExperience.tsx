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
    <div className={cx(classname, 'flex flex-col py-16 lg:flex-row lg:py-24')}>
      <div className='mb-8 w-full overflow-visible md:w-2/6 lg:mb-0'>
        <p className='block font-vollkorn text-xl opacity-40'>{job.period}</p>
      </div>

      <div className='w-full md:w-4/6'>
        <div className='flex flex-col space-y-8'>
          <a
            href={job.website}
            target='_blank'
            rel='noreferrer'
            className='group'
          >
            <div className='flex items-start space-x-4 duration-200 group-hover:text-daisy'>
              <div className='relative h-12 w-12 overflow-hidden rounded-lg duration-200 group-hover:-translate-y-1'>
                <Image
                  src={job.logo}
                  alt={`${job.logo} logo`}
                  layout='fill'
                  objectFit='fill'
                />
              </div>
              <div className='flex flex-col'>
                <h6 className='font-vollkorn text-xl font-semibold'>
                  {job.company}
                </h6>
                <p className='opacity-60'>{job.tagline}</p>
              </div>
            </div>
          </a>
          <p className='text-xl leading-relaxed opacity-70'>
            {job.description}
          </p>
        </div>
      </div>
    </div>
  );
}

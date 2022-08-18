/* eslint-disable @next/next/no-img-element */
import cx from 'classnames';
import { WorkExp } from '../../../@types/schema';

interface WorkExperienceProps {
  classname?: string;
  job: WorkExp;
}

export default function WorkExperience({
  classname,
  job,
}: WorkExperienceProps): JSX.Element {
  return (
    <div className={cx(classname, 'flex flex-col flex-wrap py-8 lg:flex-row')}>
      <div className='w-full overflow-visible md:w-2/6'>
        <p className='block font-bogart text-xl opacity-40'>{job.period}</p>
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
              <div className='h-12 w-12 overflow-hidden rounded-lg duration-200 group-hover:-translate-y-1'>
                <img src={job.logo} alt={`${job.logo} logo`} />
              </div>
              <div className='flex flex-col'>
                <h6 className='text-xl'>{job.company}</h6>
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

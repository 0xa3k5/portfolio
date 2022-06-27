import cx from 'classnames';
import { WorkExp } from '../../../@types/schema';
import Image from 'next/image';
import { useState } from 'react';
import { TakeawayCard } from './TakeawayCard';

import DownIcon from '../../../public/icons/chevron-down.svg';

interface WorkExperienceProps {
  classname?: string;
  job: WorkExp;
}

export default function WorkExperience({
  classname,
  job,
}: WorkExperienceProps): JSX.Element {
  const [takeawayOn, setTakeawayOn] = useState(false);

  return (
    <div className={cx(classname, 'flex flex-col')}>
      <div className='flex space-x-16 justify-between items-start pb-12'>
        <div className='flex space-x-8'>
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
            <p className='text-casper uppercase tracking-widest text-sm'>
              {job.period}
            </p>
            <h6 className='text-xl text-polar'>
              {job.company} – {job.role}
            </h6>
          </div>
        </div>
        <button
          className={`p-4 rounded-full duration-200 border border-woodBlue hover:bg-stoneBlue ${
            takeawayOn ? 'bg-stoneBlue' : ''
          }`}
          onClick={() => setTakeawayOn(!takeawayOn)}
        >
          <DownIcon
            className={`w-6 duration-400 ${takeawayOn ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      {takeawayOn && (
        <div className='w-full'>
          <TakeawayCard job={job} className='mb-8' />
        </div>
      )}
    </div>
  );
}

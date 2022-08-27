import cx from 'classnames';
import { Feedback } from '../../../@types/schema';

import Image from 'next/image';
import { useState } from 'react';

interface FeedbackCardProps {
  classname?: string;
  feedback: Feedback[];
}

export default function FeedbackCard({
  classname,
  feedback,
}: FeedbackCardProps): JSX.Element {
  const [selected, setSelected] = useState<Feedback>(feedback[0]);

  return (
    <div
      className={cx(
        classname,
        'container flex flex-col items-center space-y-12 overflow-hidden rounded-2xl bg-white bg-opacity-5 px-4 py-12 md:p-16'
      )}
    >
      <div className='flex h-16 items-center space-x-8'>
        {feedback.map((f) => {
          return (
            <div
              className={cx(
                'relative overflow-hidden rounded-full duration-200',
                selected === f
                  ? 'h-16 w-16 opacity-100'
                  : 'h-12 w-12 opacity-40'
              )}
              key={f.id}
              onClick={() => setSelected(f)}
            >
              <Image src={f.img} alt={f.name} layout='fill' objectFit='cover' />
            </div>
          );
        })}
      </div>
      <div className='flex'>
        {feedback.map((f) => {
          return (
            <div
              className={cx(
                selected === f ? 'visible' : 'hidden',
                'flex h-full max-w-xl flex-col items-center space-y-8 text-center duration-200'
              )}
              key={f.id}
            >
              <span className='font-lora text-2xl font-normal'>
                {f.feedback}
              </span>
              <div className='flex flex-col space-y-2 border-t border-t-white border-opacity-20 pt-8'>
                <span className='text-xl'>{f.name}</span>
                <span className='opacity-40'>
                  {f.role} @ {f.orgName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

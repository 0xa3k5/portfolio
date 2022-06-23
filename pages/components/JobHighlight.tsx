import cx from 'classnames';
import { WorkExperience } from '../api/schema';

interface JobHighlightProps {
  classname?: string;
  job: WorkExperience;
}

export default function JobHighlight({
  classname,
  job,
}: JobHighlightProps): JSX.Element {
  return (
    <div className={cx('flex space-x-8 px-2 py-16', classname)}>
      <img src={job.img} className='rounded-xl w-16 h-16' alt={job.company} />
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

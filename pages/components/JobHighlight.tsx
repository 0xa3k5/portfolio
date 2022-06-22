import cx from 'classnames';

interface JobHighlightProps {
  classname?: string;
  title: string;
  description: string;
  period: string;
  imgSrc: string;
}

export default function JobHighlight({
  title,
  description,
  period,
  classname,
  imgSrc,
}: JobHighlightProps): JSX.Element {
  return (
    <div className={cx('flex space-x-8 p-2', classname)}>
      <img src={imgSrc} className='rounded-xl w-16 h-16' alt={title} />
      <div className='flex flex-col space-y-4'>
        <p className='text-polar text-md tracking-wide uppercase'>{period}</p>
        <h6 className='text-2xl text-polar'>{title}</h6>
        <p className='text-xl text-casper'>{description}</p>
      </div>
    </div>
  );
}

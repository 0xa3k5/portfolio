import cx from 'classnames';
import { StaticPage } from '../../@types/schema';

interface PageHeroProps {
  className?: string;
  page: StaticPage;
}

export default function PageHero({
  className,
  page,
}: PageHeroProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        'container flex flex-col items-center py-8 px-8 text-center md:py-32 md:px-0'
      )}
    >
      <h1 className='mb-4 max-w-3xl font-bogart text-4xl font-bold lg:text-6xl'>
        {page.heroTitle}
      </h1>
      {page.heroText && (
        <p className='max-w-2xl text-lg opacity-80 md:text-xl'>
          {page.heroText}
        </p>
      )}
    </div>
  );
}

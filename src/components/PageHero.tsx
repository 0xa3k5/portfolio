import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { StaticPage } from '../../@types/schema';
import Header from './Header/Header';
import MobileMenu from './Header/MobileMenu';

interface PageHeroProps {
  className?: string;
  page: StaticPage;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
  isNavbarOpen: boolean;
}

export default function PageHero({
  className,
  page,
  setIsNavbarOpen,
  isNavbarOpen,
}: PageHeroProps): JSX.Element {
  return (
    <div className={cx(className, 'flex h-screen items-center justify-center')}>
      <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />

      <MobileMenu
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      <div className='container flex snap-center flex-col items-center place-self-center py-8 px-8 text-center md:py-32 md:px-0'>
        <h1 className='mb-4 max-w-3xl font-bogart text-4xl font-bold lg:text-6xl'>
          {page.heroTitle}
        </h1>
        {page.heroText && (
          <p className='max-w-2xl text-lg opacity-80 md:text-xl'>
            {page.heroText}
          </p>
        )}
      </div>
    </div>
  );
}

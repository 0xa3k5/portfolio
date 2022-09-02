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
      <div className='container flex snap-center flex-col items-center place-self-center py-8 px-4 text-center md:py-32 md:px-16 xl:px-0'>
        <h1 className='mb-4 max-w-3xl font-vollkorn text-5xl font-bold md:text-6xl'>
          {page.heroTitle.split('-').map((s, i) => {
            return (
              <>
                <span key={i}>{s}</span>
                <br key={`br-${i}`} />
              </>
            );
          })}
        </h1>
        {page.heroText && (
          <p className='max-w-md text-lg opacity-80 md:max-w-xl md:text-xl md:leading-relaxed'>
            {page.heroText}
          </p>
        )}
      </div>
    </div>
  );
}

import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { StaticPage } from '../../@types/schema';
import Header from './Header/Header';
import MobileMenu from './Header/MobileMenu';

interface PageHeroProps {
  className?: string;
  page: StaticPage;
  color?: string;
  bgColor?: string;
  isNavbarOpen: boolean;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PageHero({
  className,
  page,
  color = 'fff',
  bgColor = '000',
  isNavbarOpen,
  setIsNavbarOpen,
}: PageHeroProps): JSX.Element {
  return (
    <div className='container flex h-[80vh] w-screen flex-col items-center justify-center'>
      <Header
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        color={color}
      />
      <MobileMenu
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        color={color}
        bgColor={bgColor}
      />
      <div
        className={cx(
          className,
          'flex flex-col items-center py-8 px-4 text-center md:py-32 md:px-16 xl:px-0'
        )}
      >
        {page.heroTitle.split('-').map((s, i) => {
          return (
            <h1
              className='mb-4 max-w-3xl text-5xl font-bold lg:text-6xl'
              key={i}
            >
              {s}
            </h1>
          );
        })}
        {page.heroText && (
          <p className='max-w-md text-lg opacity-80 md:max-w-xl md:text-xl md:leading-relaxed'>
            {page.heroText}
          </p>
        )}
      </div>
    </div>
  );
}

import cx from "classnames";
import { Dispatch, SetStateAction } from "react";
import { StaticPage } from "../../@types/schema";

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
}: PageHeroProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        "flex h-[50vh] md:h-[80vh] flex-col items-center justify-center space-y-8 py-8 text-center md:py-32"
      )}
    >
      {page.heroTitle.split("-").map((s, i) => {
        return (
          <h1 className="max-w-2xl text-4xl font-semibold md:text-5xl" key={i}>
            {s}
          </h1>
        );
      })}
      {page.heroText && (
        <p className="max-w-2xl px-8 text-xl font-normal opacity-80">
          {page.heroText}
        </p>
      )}
    </div>
  );
}

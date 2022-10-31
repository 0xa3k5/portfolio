import cx from "classnames";
import { StaticPage } from "../../../@types/schema";

interface PageProps {
  className?: string;
  page: StaticPage;
}

export default function Page({ className, page }: PageProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        "flex h-screen flex-col items-center justify-center space-y-8 py-8 text-center md:py-32"
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
        <p className="max-w-2xl text-xl font-normal opacity-80 md:px-8">
          {page.heroText}
        </p>
      )}
    </div>
  );
}

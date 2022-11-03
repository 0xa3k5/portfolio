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
        "flex min-h-[40vh] w-full justify-end flex-col p-4 mt-32 sm:mt-0"
      )}
    >
      <div className="flex max-w-xl flex-col gap-8">
        {page.heroTitle.split("-").map((s, i) => {
          return (
            <h1 className="text-5xl font-bold" key={i}>
              {s}
            </h1>
          );
        })}
        {page.heroText && (
          <p className="text-xl font-normal opacity-80">{page.heroText}</p>
        )}
      </div>
    </div>
  );
}

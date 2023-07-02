import { PaperPlaneIcon } from "../../icons";
import { StaticPage } from "../../types";
import Button from "../Button";
import SocialButtonGroup from "../SocialButtonGroup";
interface PageProps {
  page: StaticPage;
}

export default function Page({ page }: PageProps): JSX.Element {
  return (
    <div className="flex w-full flex-col gap-8 px-4 pb-24 md:px-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold md:text-5xl" key="hero_title">
          {page.heroTitle}
        </h1>
        <p className="text-xl font-light opacity-70">{page.heroText}</p>
      </div>
      <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Button.Primary
          text="hey@akml.io"
          href="mailto:hey@akml.io"
          icon={<PaperPlaneIcon className="h-4 w-4" />}
        />
        <Button.HireButton />
        <SocialButtonGroup />
      </div>
    </div>
  );
}

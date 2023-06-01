import { StaticPage } from "../../types";
import Button from "../Button";

import { PaperPlaneIcon } from "../../icons";
interface PageProps {
  page: StaticPage;
}

export default function Page({ page }: PageProps): JSX.Element {
  return (
    <div className="flex flex-col gap-8 w-full px-4 md:px-12">
      <div className="flex flex-col gap-4">
        <h1 className="max-w-2xl text-4xl font-semibold" key="hero_title">
          {page.heroTitle}
        </h1>
        <p className="max-w-xl text-xl font-light opacity-70">
          {page.heroText}
        </p>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Button.Primary
          href="mailto:hey@akml.io"
          text="hey@akml.io"
          icon={<PaperPlaneIcon className="h-5 w-5" />}
        />
        <div className="flex w-full justify-between gap-4 text-white sm:justify-end">
          <Button.Social type="figma" />
          <Button.Social type="github" />
          <Button.Social type="linkedin" />
          <Button.Social type="twitter" />
          <Button.Social type="dribbble" />
        </div>
      </div>
    </div>
  );
}

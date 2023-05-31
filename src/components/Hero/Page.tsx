import cx from "classnames";
import { StaticPage } from "../../types";
import Button from "../Button";

import { PaperPlaneIcon } from "../../icons";
interface PageProps {
  className?: string;
  page: StaticPage;
}

export default function Page({ className, page }: PageProps): JSX.Element {
  return (
    <div className={cx(className, "flex w-full flex-col gap-8 sm:mt-0")}>
      <div className="flex flex-col gap-4">
        <h1 className="max-w-2xl text-4xl font-semibold" key="hero_title">
          {page.heroTitle}
        </h1>
        <p className="max-w-xl text-xl font-light opacity-70">
          {page.heroText}
        </p>
      </div>
      <div className="flex justify-between">
        <Button.Primary
          href="mailto:hey@akml.io"
          text="hey@akml.io"
          icon={<PaperPlaneIcon className="h-5 w-5" />}
        />
        <div className="flex gap-4 text-white">
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

import { LockIcon, RightArrowIcon, SoonIcon } from "../components/icons";
import { NotionPost } from "../types";

export const getIconByProp = (prop: NotionPost["properties"]) => {
  switch (true) {
    case prop.password:
      return <LockIcon className="size-6" />;
    case prop.published:
      return (
        <RightArrowIcon className="size-6 duration-100 group-hover:translate-x-1/4" />
      );
    default:
      return <SoonIcon className="size-6" />;
  }
};

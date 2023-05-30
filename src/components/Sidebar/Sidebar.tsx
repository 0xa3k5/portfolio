import Button from "../Button";
import DribbbleIcon from "../../../public/socials/dribbble.svg";

import Image from "next/image";
import { HomeIcon } from "../../icons";
import Link from "next/link";

export default function SideBar(): JSX.Element {
  return (
    <div className="fixed top-0 flex h-screen flex-col items-center justify-between border-r border-white/5 px-6 py-16">
      <Image
        src="/ak.png"
        alt=""
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex flex-col gap-8">
        <Button.Navigation href="/" name="Home" />
        <Button.Navigation href="/404" name="Works" />
        <Button.Navigation href="/404" name="Feedbacks" />
        <Button.Navigation href="/cv" name="CV" />
        
      </div>
      <div className="h-12" />
    </div>
  );
}

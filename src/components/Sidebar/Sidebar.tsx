import Image from "next/image";
import Button from "../Button";
import { SocialIcons } from "../../icons";
import Link from "next/link";
import { useState } from "react";

export default function SideBar(): JSX.Element {
  const [isControlHovered, setIsControlHovered] = useState(false);

  return (
    <div className="fixed top-0 flex h-screen flex-col items-center justify-between border-r border-white/5 px-6 py-16">
      <Link
        href="/"
        className="overflow-clip rounded-full duration-200 hover:scale-105"
      >
        <Image src="/ak.png" alt="" width={48} height={48} />
      </Link>
      <nav className="flex flex-col gap-8">
        <Button.Navigation href="/" name="Home" />
        <Button.Navigation href="/about" name="About Me" />
        <Button.Navigation href="/404" name="Works" />
        <Button.Navigation href="/404" name="Feedbacks" />
        <Button.Navigation href="/cv" name="CV" />
      </nav>
      <div className="flex flex-col gap-8">
        <Button.Icon href="" icon={<SocialIcons.Dribbble />} />
      </div>
      <div className="h-12" />
    </div>
  );
}

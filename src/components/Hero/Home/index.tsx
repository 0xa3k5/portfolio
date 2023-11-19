import cx from "classnames";
import { useTheme } from "../../../contexts/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import SocialButtonGroup from "../../SocialButtonGroup";
import { Code, Rectangle, SideProjects, Crypto } from "./Items";
import Button from "../../Button";

export default function Hero(): JSX.Element {
  const { themeClasses, themeColors } = useTheme();
  return (
    <div className="flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:py-16">
      <div className="flex items-center gap-4">
        <div className="relative flex aspect-square w-14 shrink-0 overflow-clip rounded-xl">
          <Image
            src={"/ak.png"}
            alt="AK – Product Designer"
            width={512}
            height={512}
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg">AK</span>
          <span className="opacity-60">Product Designer</span>
        </div>
      </div>

      <motion.h1
        layout
        className={cx(
          "flex flex-wrap gap-2 font-sans text-4xl font-bold sm:gap-4 sm:text-5xl",
          themeClasses.color
        )}
      >
        <span className="">{"I draw "}</span>
        <Rectangle themeColors={themeColors} />
        <span className="">{"– write "}</span>
        <Code themeColors={themeColors} />
        <span className="">{"– build "}</span>
        <SideProjects themeColors={themeColors} />
        <span className="">{"– trade "}</span>
        <Crypto themeColors={themeColors} />
      </motion.h1>
      <div className="flex gap-4">
        <Button.Copy />
        <SocialButtonGroup />
      </div>
    </div>
  );
}

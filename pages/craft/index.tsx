import cx from "classnames";
import Layout from "../../src/components/Layout";
import MainWrapper from "../../src/components/MainWrapper";
import { AnalogToggle } from "../../src/components/craft/AnalogToggle";
import { CraftFooter, CraftWrapper } from "../../src/components/craft";
import HoldToLikeButton from "../../src/components/craft/HoldToLike/HoldToLikeButton";

import { RightArrowIcon } from "../../src/icons";
import Link from "next/link";
import Pinpad from "../../src/components/craft/Pinpad";
import { ReactNode, useState } from "react";

export default function Craft(): JSX.Element {
  const [isAnalogToggleOn, setIsAnalogToggleOn] = useState(false);

  const CRAFTS: {
    id: number;
    slug: string;
    title: string;
    date: string;
    component: ReactNode;
  }[] = [
    {
      id: 0,
      slug: "hold-to-like",
      title: "Hold to Like",
      date: "Jun 2023",
      component: <HoldToLikeButton overflowClip={false} />,
    },
    {
      id: 1,
      slug: "analog-toggle",
      title: "Analog Toggle",
      date: "Jul 2023",
      component: (
        <AnalogToggle
          scale={0.8}
          isChecked={isAnalogToggleOn}
          handleOnChange={() => {
            setIsAnalogToggleOn(!isAnalogToggleOn);
          }}
        />
      ),
    },
    {
      id: 2,
      slug: "pinpad",
      title: "Sound Pin",
      date: "Jun 2023",
      component: (
        <div className="flex flex-col gap-4 rounded-xl px-2 py-2">
          <Pinpad currentLevel="normal" />
        </div>
      ),
    },
  ];

  return (
    <Layout hideCTA>
      <MainWrapper>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {CRAFTS.sort((a, b) => a.id - b.id).map((craft) => {
            return (
              <div
                className={cx(
                  "flex flex-col gap-4",
                  craft.slug === "pinpad"
                    ? "col-span-1 md:col-span-2"
                    : "col-span-1"
                )}
                key={craft.slug}
              >
                <CraftWrapper className="relative">
                  {craft.component}
                </CraftWrapper>
                <Link href={`/craft/${craft.slug}`} className="group">
                  <span className="flex items-center justify-between gap-4">
                    <span className="flex flex-col">
                      <h6 className={cx("text-2xl")}>{craft.title}</h6>
                      <span className="opacity-60">{craft.date}</span>
                    </span>
                    <RightArrowIcon className="h-6 w-6 -rotate-45 opacity-40 duration-150 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        <CraftFooter />
      </MainWrapper>
    </Layout>
  );
}

"use client";
import {
  AnalogToggle,
  CraftWrapper,
  CraftFooter,
} from "@/src/components/craft-components";
import { HoldToLikeButton } from "@/src/components/craft-components/hold-to-like";
import { Pinpad } from "@/src/components/craft-components/pinpad/pinpad";
import { RightArrowIcon } from "@/src/components/icons";
import { SectionTitle } from "@/src/components/section-title";

import { cx } from "@/src/utils/cx";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function Craft() {
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
    <div className="flex flex-col gap-8 my-40">
      <SectionTitle title="experimental" orientation="vertical" />
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
    </div>
  );
}

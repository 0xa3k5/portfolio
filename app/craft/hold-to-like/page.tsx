"use client";
import { HoldToLikeButton } from "@/src/components/craft-components/hold-to-like";
import { useState } from "react";
import { AnalogToggle } from "@/src/components/craft-components/analog-toggle";
import {
  CraftMainWrapper,
  CraftTitle,
  CraftWrapper,
  CraftFooter,
} from "@/src/components/craft-components";

export default function HoldToLike() {
  const [overflowCip, setOverflowClip] = useState(false);

  const handleOverflowToggle = () => {
    setOverflowClip(!overflowCip);
  };

  return (
    <CraftMainWrapper>
      <CraftTitle title="Hold to Like" date="June 2023" />
      <CraftWrapper>
        <div className="absolute right-2 top-4 flex items-center">
          <span className="font-md opacity-60">overflow-clip</span>
          <AnalogToggle
            scale={0.6}
            isChecked={overflowCip}
            handleOnChange={handleOverflowToggle}
          />
        </div>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <HoldToLikeButton overflowClip={overflowCip} />
          <HoldToLikeButton overflowClip={overflowCip} hasText />
        </div>
      </CraftWrapper>
      <CraftFooter />
    </CraftMainWrapper>
  );
}

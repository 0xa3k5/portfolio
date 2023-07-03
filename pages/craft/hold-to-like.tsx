import Layout from "../../src/components/Layout";
import HoldToLikeButton from "../../src/components/craft/HoldToLike/HoldToLikeButton";
import { useState } from "react";
import { AnalogToggle } from "../../src/components/craft/AnalogToggle";
import {
  CraftMainWrapper,
  CraftTitle,
  CraftWrapper,
  CraftFooter,
} from "../../src/components/craft";

export default function HoldToLike() {
  const [overflowCip, setOverflowClip] = useState(false);

  const handleOverflowToggle = () => {
    setOverflowClip(!overflowCip);
  };

  return (
    <Layout hideCTA>
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
    </Layout>
  );
}

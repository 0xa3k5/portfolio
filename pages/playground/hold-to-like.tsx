import Layout from "../../src/components/Layout";
import HoldToLikeButton from "../../src/components/playground/HoldToLike/HoldToLikeButton";
import { useState } from "react";
import { PlaygroundMainWrapper, PlaygroundTitle, PlaygroundWrapper, PlaygroundFooter } from "../../src/components/playground";

export default function HoldToLike() {
  return (
    <Layout hideCTA>
      <PlaygroundMainWrapper>
        <PlaygroundTitle title="Hold to Like" date="June 2023" />
        <PlaygroundWrapper>
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <HoldToLikeButton />
            <HoldToLikeButton hasText />
          </div>
        </PlaygroundWrapper>
        <PlaygroundFooter />
      </PlaygroundMainWrapper>
    </Layout>
  );
}

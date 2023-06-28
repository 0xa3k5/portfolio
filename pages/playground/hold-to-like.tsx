import Layout from "../../src/components/Layout";
import HoldToLikeButton from "../../src/components/playground/HoldToLike/HoldToLikeButton";
import PlaygroundMainWrapper from "../../src/components/Wrappers/PlaygroundMainWrapper";
import PlaygroundTitle from "../../src/components/PlaygroundTitle";
import PlaygroundWrapper from "../../src/components/Wrappers/PlaygroundWrapper";

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
      </PlaygroundMainWrapper>
    </Layout>
  );
}

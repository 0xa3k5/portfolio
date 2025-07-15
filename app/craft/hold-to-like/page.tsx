import Layout from "@/components/Layout";
import MainWrapper from "@/components/MainWrapper";
import CraftMainWrapper from "@/components/craft/CraftMainWrapper";
import CraftTitle from "@/components/craft/CraftTitle";
import { HoldToLikeButton } from "@/components/craft/HoldToLike";

export const metadata = {
  title: "Hold to Like",
  description: "A hold-to-like button component",
};

export default function HoldToLikePage() {
  return (
    <Layout hideCTA>
      <MainWrapper>
        <CraftMainWrapper>
          <CraftTitle
            title="Hold to Like"
            description="Hold the button to like something"
          />
          <div className="flex items-center justify-center">
            <HoldToLikeButton overflowClip={true} />
          </div>
        </CraftMainWrapper>
      </MainWrapper>
    </Layout>
  );
}

import { useState } from "react";
import Layout from "@/components/Layout";
import MainWrapper from "@/components/MainWrapper";
import CraftMainWrapper from "@/components/craft/CraftMainWrapper";
import CraftTitle from "@/components/craft/CraftTitle";
import { Pinpad } from "@/components/craft/Pinpad";

export const metadata = {
  title: "Sound Pin",
  description: "A sound pin component",
};

export default function PinpadPage() {
  const [currentLevel, setCurrentLevel] = useState<"normal" | "loud" | "quiet">(
    "normal"
  );

  return (
    <Layout hideCTA>
      <MainWrapper>
        <CraftMainWrapper>
          <CraftTitle
            title="Sound Pin"
            description="A pinpad with sound feedback"
          />
          <div className="flex items-center justify-center">
            <Pinpad currentLevel={currentLevel} />
          </div>
        </CraftMainWrapper>
      </MainWrapper>
    </Layout>
  );
}

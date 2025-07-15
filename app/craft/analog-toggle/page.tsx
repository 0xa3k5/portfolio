import { useState } from "react";
import Layout from "@/components/Layout";
import MainWrapper from "@/components/MainWrapper";
import CraftMainWrapper from "@/components/craft/CraftMainWrapper";
import CraftTitle from "@/components/craft/CraftTitle";
import { AnalogToggle } from "@/components/craft/AnalogToggle";

export const metadata = {
  title: "Analog Toggle",
  description: "An analog toggle component",
};

export default function AnalogTogglePage() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Layout hideCTA>
      <MainWrapper>
        <CraftMainWrapper>
          <CraftTitle
            title="Analog Toggle"
            description="A toggle that feels like a real analog switch"
          />
          <div className="flex items-center justify-center">
            <AnalogToggle
              isChecked={isChecked}
              handleOnChange={() => setIsChecked(!isChecked)}
            />
          </div>
        </CraftMainWrapper>
      </MainWrapper>
    </Layout>
  );
}

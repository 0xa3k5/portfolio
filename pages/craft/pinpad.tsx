import { useState } from "react";
import Layout from "../../src/components/Layout";
import PinpadLevelSelector from "../../src/components/craft/Pinpad/PinpadLevelSelector";
import { TPinpadGameLevels } from "../../src/constants/craft/pinpad-constants";
import {
  CraftMainWrapper,
  CraftTitle,
  CraftWrapper,
  CraftFooter,
} from "../../src/components/craft";
import Pinpad from "../../src/components/craft/Pinpad";
import cx from "classnames";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function PinpadPage(): JSX.Element {
  const [currentLevel, setCurrentLevel] = useState<TPinpadGameLevels>("normal");
  const { themeClasses } = useTheme();

  return (
    <Layout hideCTA>
      <CraftMainWrapper>
        <CraftTitle title="Pinpad" date="June 2023" />
        <CraftWrapper>
          <PinpadLevelSelector
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
          />
          <div
            className={cx(
              "flex max-w-lg flex-col gap-4 rounded-xl border-0 p-4 md:border md:border-opacity-10 md:px-16 md:py-12",
              themeClasses.border
            )}
          >
            <Pinpad currentLevel={currentLevel} />
          </div>
        </CraftWrapper>
        <CraftFooter />
      </CraftMainWrapper>
    </Layout>
  );
}

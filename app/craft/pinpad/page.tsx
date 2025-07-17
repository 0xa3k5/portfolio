"use client";
import { JSX, useState } from "react";

import { Pinpad } from "@/src/components/craft-components/pinpad/pinpad";

// import { useTheme } from "@/src/contexts/ThemeContext";

import { TPinpadGameLevels } from "@/src/components/craft-components/pinpad/pinpad-constants";
import { PinpadLevelSelector } from "@/src/components/craft-components/pinpad/pinpad-level-selector";
import {
  CraftMainWrapper,
  CraftTitle,
  CraftWrapper,
  CraftFooter,
} from "@/src/components/craft-components";

export default function PinpadPage(): JSX.Element {
  const [currentLevel, setCurrentLevel] = useState<TPinpadGameLevels>("normal");

  return (
    <CraftMainWrapper>
      <CraftTitle title="Pinpad" date="June 2023" />
      <CraftWrapper>
        <PinpadLevelSelector
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
        />
        <div className="flex max-w-lg flex-col gap-4 rounded-xl border-0 p-4 md:border md:px-16 md:py-12 border-foam/10">
          <Pinpad currentLevel={currentLevel} />
        </div>
      </CraftWrapper>
      <CraftFooter />
    </CraftMainWrapper>
  );
}

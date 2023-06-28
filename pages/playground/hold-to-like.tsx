import cx from "classnames";
import Layout from "../../src/components/Layout";
import MainWrapper from "../../src/components/MainWrapper";
import { useTheme } from "../../src/contexts/ThemeContext";
import HoldToLikeButton from "../../src/components/playground/HoldToLike/HoldToLikeButton";

export default function HoldToLike() {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <Layout>
      <MainWrapper>
        <div
          className={cx(
            "flex w-full items-center justify-center gap-12 rounded-xl bg-opacity-5 p-24",
            themeClasses.bgInverse
          )}
        >
          <HoldToLikeButton />
          <HoldToLikeButton hasText />
        </div>
      </MainWrapper>
    </Layout>
  );
}

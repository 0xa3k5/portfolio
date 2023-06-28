import cx from "classnames";
import Layout from "../../src/components/Layout";
import MainWrapper from "../../src/components/MainWrapper";
import { useTheme } from "../../src/contexts/ThemeContext";
import HoldToLikeButton from "../../src/components/playground/HoldToLike/HoldToLikeButton";
import { GetStaticProps } from "next";
import NotionService from "../api/notion";
import { Playground } from "../../src/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MdStringObject } from "notion-to-md/build/types";
import PlaygroundWrapper from "../../src/components/Wrappers/PlaygroundWrapper";

interface Props {
  page: Playground;
  markdown: MdStringObject;
}

export default function HoldToLike({ page, markdown }: Props) {
  const { theme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
      <MainWrapper>
    <Layout hideCTA>
        <div className={cx("flex w-full flex-col gap-2", themeClasses.color)}>
          <h1 className="text-3xl font-bold">{page.title}</h1>
          <p className="text-xl font-light opacity-60">{page.date}</p>
        </div>
        <div
          className={cx(
            "flex w-full flex-col justify-center gap-12 rounded-xl bg-opacity-5 p-24 md:flex-row",
            themeClasses.bgInverse
          )}
        >
          <HoldToLikeButton />
          <HoldToLikeButton hasText />
        </div>
      </MainWrapper>
        <article
          className={cx(
            "prose prose-lg w-full prose-headings:font-vollkorn prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-3xl prose-h3:font-normal prose-p:font-light prose-p:leading-snug   prose-p:tracking-wide prose-a:duration-150 prose-a:hover:text-white prose-ul:font-light prose-ul:tracking-wider prose-img:rounded-xl md:prose-h1:text-5xl",
            theme === "light" ? "prose" : "prose-invert"
          )}
        >
          <ReactMarkdown>{markdown["parent"]}</ReactMarkdown>
        </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const { posts, md } = await notionService.getPlayground();

  const page = posts.find((p) => p.slug.toLowerCase() === "hold-to-like");

  const markdown = md[page.slug].markdown;

  return {
    props: {
      page,
      markdown,
    },
  };
};

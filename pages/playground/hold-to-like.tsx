import cx from "classnames";
import Layout from "../../src/components/Layout";
import { useTheme } from "../../src/contexts/ThemeContext";
import HoldToLikeButton from "../../src/components/playground/HoldToLike/HoldToLikeButton";
import { GetStaticProps } from "next";
import NotionService from "../api/notion";
import { Playground } from "../../src/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MdStringObject } from "notion-to-md/build/types";
import PlaygroundMainWrapper from "../../src/components/Wrappers/PlaygroundMainWrapper";
import PlaygroundTitle from "../../src/components/PlaygroundTitle";
import PlaygroundWrapper from "../../src/components/Wrappers/PlaygroundWrapper";

interface Props {
  page: Playground;
  markdown: MdStringObject;
}

export default function HoldToLike({ page, markdown }: Props) {
  const { theme } = useTheme();

  return (
    <Layout hideCTA>
      <PlaygroundMainWrapper>
        <PlaygroundTitle title={page.title} date={page.date} />
        <PlaygroundWrapper>
          <HoldToLikeButton />
          <HoldToLikeButton hasText />
        </PlaygroundWrapper>
        <article
          className={cx(
            "prose prose-lg w-full prose-headings:font-vollkorn prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-3xl prose-h3:font-normal prose-p:font-light prose-p:leading-snug   prose-p:tracking-wide prose-a:duration-150 prose-a:hover:text-white prose-ul:font-light prose-ul:tracking-wider prose-img:rounded-xl md:prose-h1:text-5xl",
            theme === "light" ? "prose" : "prose-invert"
          )}
        >
          <ReactMarkdown>{markdown["parent"]}</ReactMarkdown>
        </article>
      </PlaygroundMainWrapper>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const { posts, md } = await notionService.getPlayground();

  const page = posts.find((p) => p.slug.toLowerCase() === "hold-to-like");

  const markdown = md[page?.slug].markdown;

  return {
    props: {
      page,
      markdown,
    },
  };
};

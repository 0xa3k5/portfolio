import { GetStaticProps } from "next";
import NotionService from "../api/notion";
import { Idea, StaticPage } from "../../src/types";
import Layout from "../../src/components/Layout";
import MainWrapper from "../../src/components/MainWrapper";
import SectionsWrapper from "../../src/components/SectionsWrapper";
import { MdStringObject } from "notion-to-md/build/types";
import { IdeaCard } from "../../src/components/Cards/IdeaCard";
import SectionTitle from "../../src/components/SectionTitle";
import PageHead from "../../src/components/PageHead";

interface Props {
  page: StaticPage;
  ideas: {
    posts: Idea[];
    md: {
      [key: string]: { markdown: MdStringObject };
    };
  };
}

export default function IdeasPage({ ideas, page }: Props): JSX.Element {
  return (
    <Layout hideCTA>
      <PageHead page={page} />
      <MainWrapper>
        <SectionsWrapper className="max-w-3xl">
          <SectionTitle
            className="mb-8"
            title="My Open Source ideas with random brain crumbs"
            subtext="feel free to copy/steal/improve and build any of them"
          />
          {ideas.posts
            .sort((a, b) => parseFloat(b.date) - parseFloat(a.date))
            .map((idea) => {
              return (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  md={ideas.md[idea.slug]?.markdown.parent}
                />
              );
            })}
        </SectionsWrapper>
      </MainWrapper>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Ideas"
  );

  const ideas = await notionService.getIdeas();

  return {
    props: {
      page,
      ideas,
    },
  };
};

import { GetStaticProps } from "next";
import { NotionPost, StaticPage } from "../src/types";
import NotionService from "./api/notion";
import PageHead from "../src/components/PageHead";
import ContentCard from "../src/components/Cards/ContentCard";
import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import MainWrapper from "../src/components/MainWrapper";

interface FourOhFourProps {
  page: StaticPage;
  posts: NotionPost[];
}

export default function FourOhFour({
  page,
  posts,
}: FourOhFourProps): JSX.Element {
  return (
    <>
      <PageHead page={page} />
      <MainWrapper>
        <div className="flex w-full flex-col gap-8 sm:mt-0">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-4xl font-semibold" key="hero_title">
              {page.heroTitle}
            </h1>
            <p className="max-w-xl text-xl font-light opacity-70">
              {page.heroText}
            </p>
          </div>
        </div>
        <SectionsWrapper>
          <SectionTitle title="case studies" />
          <div className="flex flex-col gap-8 md:gap-12">
            {posts
              .filter((p) => p.properties.published)
              .sort(
                (a: NotionPost, b: NotionPost) =>
                  a.properties.number - b.properties.number
              )
              .map((p: NotionPost) => {
                return <ContentCard post={p} key={p.properties.id} />;
              })}
          </div>
        </SectionsWrapper>
      </MainWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "404"
  );

  const posts = (await notionService.getCaseStudies()).filter(
    (p) => p.properties.tag !== "Side Project"
  );

  return {
    props: {
      page,
      posts,
    },
  };
};

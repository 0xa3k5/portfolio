import PageHead from "../../src/components/PageHead";
import { StaticPage, NotionPost } from "../../src/types";
import { GetStaticProps } from "next";
import ContentCard from "../../src/components/Cards/ContentCard";
import SectionTitle from "../../src/components/SectionTitle";
import SectionsWrapper from "../../src/components/SectionsWrapper";
import NotionService from "../api/notion";
import MainWrapper from "../../src/components/Wrappers/MainWrapper";
import Layout from "../../src/components/Layout";

interface WorksProps {
  page: StaticPage;
  works: NotionPost[];
}

export default function Works({ page, works }: WorksProps): JSX.Element {
  return (
    <Layout>
      <PageHead page={page} />
      <MainWrapper>
        <div className="flex flex-col items-center">
          <SectionsWrapper>
            <SectionTitle title="works" />
            <div className="flex flex-col gap-8 md:gap-12">
              {works
                .sort(
                  (a: NotionPost, b: NotionPost) =>
                    a.properties.number - b.properties.number
                )
                .map((w: NotionPost) => {
                  return <ContentCard post={w} key={w.properties.id} />;
                })}
            </div>
          </SectionsWrapper>
        </div>
      </MainWrapper>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Works"
  );

  const works = await notionService.getCaseStudies();

  return {
    props: {
      page,
      works,
    },
  };
};

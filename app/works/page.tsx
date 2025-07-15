
import { NotionPost, StaticPage } from "@/types/types";
import NotionService from "../../pages/api/notion";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import MainWrapper from "@/components/MainWrapper";
import SectionTitle from "@/components/SectionTitle";
import SectionsWrapper from "@/components/SectionsWrapper";
import ContentCard from "@/components/Cards/ContentCard";

export default async function Works(): Promise<JSX.Element> {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Works"
  );

  const posts = (await notionService.getCaseStudies()).filter(
    (p) => p.properties.tag !== "Side Project"
  );

  if (!page) {
    return <div>Loading...</div>;
  }
  return (
    <Layout hideCTA>
      <PageHead page={page} />
      <MainWrapper>
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
    </Layout>
  );
}

export async function generateMetadata() {
  const notionService = new NotionService();
  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Works"
  );

  return {
    title: page?.title || "Works",
    description: page?.description || "Case studies and projects",
  };
}

import { NotionPost, StaticPage } from "@/types/types";
import NotionService from "../pages/api/notion";
import PageHead from "@/components/PageHead";
import ContentCard from "@/components/Cards/ContentCard";
import SectionTitle from "@/components/SectionTitle";
import SectionsWrapper from "@/components/SectionsWrapper";
import MainWrapper from "@/components/MainWrapper";
import Layout from "@/components/Layout";

export default async function FourOhFour(): Promise<JSX.Element> {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "404"
  );

  const posts = (await notionService.getCaseStudies()).filter(
    (p) => p.properties.tag !== "Side Project"
  );

  if (!page) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
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
    </Layout>
  );
}

export async function generateMetadata() {
  const notionService = new NotionService();
  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "404"
  );

  return {
    title: page?.title || "404 - Page Not Found",
    description: page?.description || "Page not found",
  };
}

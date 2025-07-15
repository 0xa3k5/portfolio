
import { StaticPage, Idea } from "@/types/types";
import NotionService from "../../pages/api/notion";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import MainWrapper from "@/components/MainWrapper";
import SectionTitle from "@/components/SectionTitle";
import SectionsWrapper from "@/components/SectionsWrapper";
import IdeaCard from "@/components/Cards/IdeaCard";
import { MdStringObject } from "notion-to-md/build/types";

export default async function IdeasPage(): Promise<JSX.Element> {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Ideas"
  );

  const ideas = await notionService.getIdeas();

  if (!page) {
    return <div>Loading...</div>;
  }
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

export async function generateMetadata() {
  const notionService = new NotionService();
  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Ideas"
  );

  return {
    title: page?.title || "Ideas",
    description: page?.description || "Open source ideas",
  };
}

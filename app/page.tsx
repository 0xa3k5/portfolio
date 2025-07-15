import { NotionPost, SideProject, WorkExp } from "@/types/types";
import NotionService from "../pages/api/notion";
import Hero from "@/components/Hero";
import PageHead from "@/components/PageHead";
import SectionTitle from "@/components/SectionTitle";
import SectionsWrapper from "@/components/SectionsWrapper";
import SideProjectsCard from "@/components/Cards/SideProjectsCard";
import FeedbackCard from "@/components/Cards/FeedbackCard";
import MainWrapper from "@/components/MainWrapper";
import Layout from "@/components/Layout";
import WorkExperience from "@/components/WorkExperience";
import PortfolioCard from "@/components/Cards/PortfolioCard";
import "@/styles/globals.css";

export default async function Home() {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Home"
  );
  const posts = await notionService.getCaseStudies();
  const sideProjects = await notionService.getSideProjects();
  const feedbacks = await notionService.getFeedbacks();
  const explorations = await notionService.getExplorations();
  const collaborators = await notionService.getCollaborators();
  const workExp = await notionService.getWorkExp();

  const works = posts.filter((p) => p.properties.tag !== "Side Project");

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <PageHead page={page} />
      <MainWrapper>
        <Hero.Home />
        <SectionsWrapper>
          <SectionTitle title="Work Experiences" />
          <div className="flex w-full flex-col">
            {workExp
              .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
              .map((w: WorkExp) => {
                return (
                  <WorkExperience
                    collaborators={collaborators.filter((collab) =>
                      w.collaborators.relationIds.includes(collab.id)
                    )}
                    job={w}
                    key={`about-${w.id}`}
                  />
                );
              })}
          </div>
        </SectionsWrapper>
        <div className="flex flex-col">
          {works
            .sort(
              (a: NotionPost, b: NotionPost) =>
                a.properties.number - b.properties.number
            )
            .map((p: NotionPost) => {
              return <PortfolioCard post={p} key={p.properties.id} />;
            })}
        </div>
        <SectionsWrapper>
          <SectionTitle title="on the side" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {sideProjects
              .sort((a: SideProject, b: SideProject) => b.date - a.date)
              .map((p: SideProject) => {
                return (
                  <SideProjectsCard
                    className="col-span-1"
                    post={p}
                    key={p.id}
                  />
                );
              })}
          </div>
        </SectionsWrapper>
        <SectionsWrapper>
          <SectionTitle title="feedbacks & testimonials" />
          <FeedbackCard.Grouped feedback={feedbacks} />
        </SectionsWrapper>
      </MainWrapper>
    </Layout>
  );
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  const notionService = new NotionService();
  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Home"
  );

  return {
    title: page?.title || "AK - Product Designer",
    description: page?.description || "Portfolio of AK, a Product Designer",
  };
}

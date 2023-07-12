import { GetStaticProps } from "next";
import {
  NotionPost,
  SideProject,
  StaticPage,
  Feedback,
  WorkExp,
  Collaborator,
} from "../src/types";
import NotionService from "./api/notion";
import Hero from "../src/components/Hero";
import PageHead from "../src/components/PageHead";

import ContentCard from "../src/components/Cards/ContentCard/Content";
import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import SideProjectsCard from "../src/components/Cards/SideProjectsCard";
import FeedbackCard from "../src/components/Cards/FeedbackCard";
import MainWrapper from "../src/components/MainWrapper";
import Layout from "../src/components/Layout";
import WorkExperience from "../src/components/WorkExperience";

interface HomeProps {
  page: StaticPage;
  works: NotionPost[];
  sideProjects: SideProject[];
  feedbacks: Feedback[];
  collaborators: Collaborator[];
  workExp: WorkExp[];
}

export default function Home({
  page,
  works,
  sideProjects,
  feedbacks,
  collaborators,
  workExp,
}: HomeProps) {
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
        <SectionsWrapper>
          <SectionTitle title="selected work" />
          <div className="flex flex-col gap-8 md:gap-12">
            {works
              .sort(
                (a: NotionPost, b: NotionPost) =>
                  a.properties.number - b.properties.number
              )
              .map((p: NotionPost) => {
                return <ContentCard post={p} key={p.properties.id} />;
              })}
          </div>
        </SectionsWrapper>
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

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      page,
      works,
      sideProjects,
      feedbacks,
      explorations,
      collaborators,
      workExp,
    },
  };
};

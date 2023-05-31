import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import {
  Exploration,
  NotionPost,
  StaticPage,
  Feedback,
  WorkExp,
} from "../src/types";
import NotionService from "./api/notion";
import Hero from "../src/components/Hero";
import PageHead from "../src/components/PageHead";

import ContentCard from "../src/components/Cards/ContentCard/Content";
import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/sections/SectionsWrapper";

interface HomeProps {
  page: StaticPage;
  works: NotionPost[];
  sideProjects: NotionPost[];
  explorations: Exploration[];
  feedbacks: Feedback[];
  workExp: WorkExp[];
}

export default function Home({ page, works }: HomeProps) {
  return (
    <>
      <PageHead page={page} />
      <motion.main className="container my-48 flex max-w-4xl flex-col items-center gap-24 overflow-x-hidden ">
        <Hero.Page page={page} />
        <SectionsWrapper>
          <SectionTitle title="highlighted projects" className="mb-16" />
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
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Home"
  );
  const posts = await notionService.getCaseStudies();
  const explorations = await notionService.getExplorations();
  const feedbacks = await notionService.getFeedbacks();
  const workExp = await notionService.getWorkExp();

  const works = posts.filter((p) => p.properties.tag !== "Side Project");
  const sideProjects = posts.filter((p) => p.properties.tag === "Side Project");

  return {
    props: {
      page,
      works,
      sideProjects,
      explorations,
      feedbacks,
      workExp,
    },
  };
};

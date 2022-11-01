import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { motion, Variants } from "framer-motion";
import {
  Exploration,
  NotionPost,
  StaticPage,
  Feedback,
  WorkExp,
} from "../@types/schema";
import NotionService from "./api/notion";
import ContentCard from "../src/components/Cards/ContentCard";
import Hero from "../src/components/Hero";
import PageHead from "../src/components/PageHead";
import ExplorationsCard from "../src/components/Cards/ExplorationsCard/ExplorationsCard";
import SectionTitle from "../src/components/SectionTitle";
import FeedbackCard from "../src/components/Cards/FeedbackCard";
import WorkExperience from "../src/components/WorkExperience";
import { useAppContext } from "../hooks/useAppContext";

interface HomeProps {
  page: StaticPage;
  works: NotionPost[];
  sideProjects: NotionPost[];
  explorations: Exploration[];
  feedbacks: Feedback[];
  workExp: WorkExp[];
}

export default function Home({
  page,
  works,
  sideProjects,
  explorations,
  feedbacks,
  workExp,
}: HomeProps) {
  const appContext = useAppContext();
  const [hovered, setHovered] = useState<NotionPost>(null);

  useEffect(() => {
    appContext.setTheme({
      color: hovered ? hovered?.properties?.color : "ffffff",
      bgColor: hovered ? hovered?.properties?.bgColor : "000000",
    });
  }, [hovered]);

  const bgPainterVariants: Variants = {
    initial: {
      backgroundColor: "#ffffff",
    },
    target: {
      backgroundColor: `#${appContext.theme.bgColor}`,
    },
  };

  const pageVariants = {
    hidden: { opacity: 0, x: 0, y: -60, transition: { duration: 0.2 } },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      color: `#${appContext.theme.color}`,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, x: 0, y: -60, transition: { duration: 0.6 } },
  };

  return (
    <>
      <div className="fixed -z-50 h-screen w-screen">
        <motion.div
          variants={bgPainterVariants}
          initial="initial"
          animate="target"
          onChange={() => motion.animate}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
          className="absolute top-1/2 left-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform"
        />
      </div>
      <PageHead page={page} />
      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        onChange={() => motion.animate}
        className="container flex max-w-5xl flex-col items-center space-y-24 overflow-x-hidden px-4 md:px-12 xl:max-w-6xl"
      >
        <Hero.Page page={page} />
        <section className="flex w-full flex-col px-4 py-24 lg:px-0">
          <SectionTitle title="highlighted case studies" className="mb-16" />
          <div className="flex items-center space-x-4">
            <div className="flex w-full flex-col space-y-8 md:space-y-12 lg:w-1/2 lg:pr-12">
              {works
                .sort(
                  (a: NotionPost, b: NotionPost) =>
                    a.properties.number - b.properties.number
                )
                .map((p: NotionPost) => {
                  return (
                    <ContentCard.Compact
                      post={p}
                      key={p.properties.id}
                      onMouseEnter={() => setHovered(p)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );
                })}
            </div>
            <div className="relative hidden flex-1 lg:inline-block">
              {hovered && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hovered.details.img}
                  alt={hovered.details.title}
                  height="80%"
                  width="100%"
                />
              )}
            </div>
          </div>
        </section>
        <section className="flex w-full flex-col px-4 py-24 lg:px-0">
          <SectionTitle title="people said nice things" />
          {feedbacks.map((f) => {
            return (
              <FeedbackCard.Single
                feedback={f}
                key={f.id}
                classname="border-b border-opacity-10 border-white last-of-type:border-none"
              />
            );
          })}
        </section>
        <section className="flex w-full flex-col px-4 py-24 lg:px-0">
          <SectionTitle title="work experience" />
          {workExp
            .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
            .map((w: WorkExp) => {
              return (
                <WorkExperience
                  job={w}
                  key={`about-${w.id}`}
                  classname="border-b border-opacity-10 border-white last-of-type:border-none"
                />
              );
            })}
        </section>
        <section className="flex w-full flex-col px-4 py-24 lg:px-0">
          <SectionTitle title="on the side" className="mb-16" />
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full flex-col space-y-8 md:space-y-12 lg:w-1/2 lg:pr-12">
              {sideProjects.map((p) => {
                return (
                  <ContentCard.Compact
                    post={p}
                    key={p.properties.id}
                    onMouseEnter={() => setHovered(p)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
            </div>
            <div className="relative hidden flex-1 lg:inline-block">
              {hovered && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hovered.details.img}
                  alt={hovered.details.title}
                  height="80%"
                  width="100%"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </section>
        <section className="flex w-full flex-col px-4 py-24 lg:px-0">
          <SectionTitle title="some explorations" className="mb-8 md:mb-16" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {explorations.map((exp) => {
              return <ExplorationsCard exploration={exp} key={exp.id} />;
            })}
          </div>
        </section>
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

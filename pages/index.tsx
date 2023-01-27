import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { motion, Variants } from "framer-motion";
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
import { useAppContext } from "../hooks/useAppContext";

import Sections from "../src/sections";

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
        className="container flex max-w-5xl flex-col items-center gap-24 overflow-x-hidden px-4 md:px-12 xl:max-w-6xl"
      >
        <Hero.Page page={page} />
        <Sections.Posts
          title="highlighted projects"
          posts={works}
          state={{ hovered, setHovered }}
        />
        <Sections.Feedbacks feedbacks={feedbacks} />
        <Sections.WorkExperiences workExp={workExp} />
        <Sections.Posts
          title="nightly projects"
          posts={sideProjects}
          state={{ hovered, setHovered }}
        />
        <Sections.Explorations explorations={explorations} />
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

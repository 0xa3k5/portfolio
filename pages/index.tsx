import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
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
import PageHero from "../src/components/PageHero";
import PageHead from "../src/components/PageHead";
import Header from "../src/components/Header/Header";
import ExplorationsCard from "../src/components/Cards/ExplorationsCard/ExplorationsCard";
import SectionTitle from "../src/components/SectionTitle";
import FeedbackCard from "../src/components/Cards/FeedbackCard";
import WorkExperience from "../src/components/WorkExperience";
import MobileMenu from "../src/components/Header/MobileMenu";

interface HomeProps {
  page: StaticPage;
  posts: NotionPost[];
  explorations: Exploration[];
  feedbacks: Feedback[];
  workExp: WorkExp[];
}

export default function Home({
  page,
  posts,
  explorations,
  feedbacks,
  workExp,
}: HomeProps) {
  const works = posts.filter((p) => p.properties.tag !== "Side Project");
  const sideProjects = posts.filter((p) => p.properties.tag === "Side Project");

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [color, setColor] = useState<string>("fff");
  const [bgColor, setBgColor] = useState<string>("000");
  const [hovered, setHovered] = useState<NotionPost>(null);

  useEffect(() => {
    setColor(hovered?.properties?.color || "ffffff");
    setBgColor(hovered?.properties?.bgColor || "000000");

    console.log("Inview", hovered?.details?.title);
  }, [hovered]);

  const bgPainterVariants: Variants = {
    initial: {
      backgroundColor: "#ffffff",
    },
    target: {
      backgroundColor: `#${bgColor}`,
    },
  };

  const pageVariants = {
    hidden: { opacity: 0, x: 0, y: -60, transition: { duration: 0.2 } },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      color: `#${color}`,
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
        className="overflow-x-hidden"
      >
        <Header
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
          color={color}
        />
        <MobileMenu
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
          color={color}
          bgColor={bgColor}
        />
        <div className="container flex max-w-5xl flex-col space-y-24 px-4 md:space-y-48 md:px-0">
          <PageHero
            page={page}
            color={color}
            bgColor={bgColor}
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />
          <section className="flex flex-col px-4 py-24 lg:px-0">
            <SectionTitle
              title="highlighted case studies"
              className="mb-8 md:mb-16"
            />
            <div className="flex min-h-[40vh] w-full items-center space-x-4">
              <div className="flex w-full flex-col space-y-12 md:w-1/2">
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
              {hovered && (
                <div className="relative hidden flex-1 md:inline-block">
                  <Image
                    src={hovered.details.img}
                    alt={hovered.details.title}
                    layout="responsive"
                    height="80%"
                    width="100%"
                    objectFit="contain"
                    objectPosition="top"
                    priority
                    unoptimized
                  />
                </div>
              )}
            </div>
          </section>
          <section className="flex max-w-4xl flex-col px-4 py-24 lg:px-0">
            <SectionTitle title="people said nice things" />
            {feedbacks.map((f) => {
              return (
                <FeedbackCard.Single
                  feedback={f}
                  key={f.id}
                  classname="border-b border-opacity-5 border-white last-of-type:border-none"
                />
              );
            })}
          </section>
          <section className="flex max-w-4xl flex-col px-4 py-24 lg:px-0">
            <SectionTitle title="work experience" />
            {workExp
              .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
              .map((w: WorkExp) => {
                return (
                  <WorkExperience
                    job={w}
                    key={`about-${w.id}`}
                    classname="border-b border-opacity-5 border-white last-of-type:border-none"
                  />
                );
              })}
          </section>
          <section className="flex flex-col px-4 py-24 lg:px-0">
            <SectionTitle title="on the side" className="mb-8 md:mb-16" />
            <div className="flex min-h-[40vh] w-full items-center justify-center space-x-4">
              <div className="flex w-full flex-col space-y-12 md:w-1/2">
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
              <div className="relative hidden flex-1 md:inline-block">
                {hovered && (
                  <Image
                    src={hovered.details.img}
                    alt={hovered.details.title}
                    layout="responsive"
                    height="80%"
                    width="100%"
                    objectFit="contain"
                    objectPosition="top"
                    priority
                    unoptimized
                  />
                )}
              </div>
            </div>
          </section>
          <section className="flex flex-col px-4 py-24 lg:px-0">
            <SectionTitle title="some explorations" className="mb-8 md:mb-16" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {explorations.map((exp) => {
                return <ExplorationsCard exploration={exp} key={exp.id} />;
              })}
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Home"
  );
  const posts = await notionService.getPortfolioPosts();
  const explorations = await notionService.getExplorations();
  const feedbacks = await notionService.getFeedbacks();
  const workExp = await notionService.getWorkExp();

  return {
    props: {
      page,
      posts,
      explorations,
      feedbacks,
      workExp,
    },
  };
};

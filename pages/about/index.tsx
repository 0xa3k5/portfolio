import NotionService from "../api/notion";
import { GetStaticProps } from "next";
import { WorkExp, StaticPage, Feedback } from "../../@types/schema";
import WorkExperience from "../../src/components/WorkExperience";
import PageHead from "../../src/components/PageHead";
import PageHero from "../../src/components/PageHero";
import { motion } from "framer-motion";
import { motionVariants } from "../../src/utils/motionVariants";
import { useState } from "react";
import FeedbackCard from "../../src/components/Cards/FeedbackCard";
import SectionTitle from "../../src/components/SectionTitle";
import Header from "../../src/components/Header/Header";
import MobileMenu from "../../src/components/Header/MobileMenu";

interface AboutProps {
  page: StaticPage;
  workExp: WorkExp[];
  feedbacks: Feedback[];
}

export default function About({
  page,
  workExp,
  feedbacks,
}: AboutProps): JSX.Element {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <PageHead page={page} />
      <motion.main
        variants={motionVariants.pageVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
      >
        <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
        <MobileMenu
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <PageHero
          page={page}
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <div className="container flex max-w-5xl flex-col space-y-24 px-4 md:space-y-48 md:px-0 xl:max-w-7xl">
          <section className="mb-24 flex max-w-4xl flex-col space-y-16 px-4 py-24 lg:px-0">
            <div className="flex space-x-16">
              <SectionTitle title="yo yo yo" />
              <div className="w-4/6">
                <p className="text-xl leading-relaxed opacity-70">
                  “The fact that AK joined with an incredible will to make
                  things happen and to bring up new cool and up-to-date inputs,
                  aligned with his specific knowledge about similar niche
                  products, made all the difference and we can see it on the new
                  Widget.”
                </p>
              </div>
            </div>
          </section>
          <section className="mb-24 flex max-w-4xl flex-col space-y-16 px-4 py-24 lg:px-0">
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
          <section className="flex max-w-4xl flex-col px-4 lg:px-0">
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
        </div>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const workExp = await notionService.getWorkExp();
  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "About"
  );

  const feedbacks = await notionService.getFeedbacks();

  return {
    props: {
      page,
      workExp,
      feedbacks,
    },
  };
};

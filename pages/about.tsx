import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { StaticPage, Feedback, WorkExp } from "../src/types";
import NotionService from "./api/notion";
import Hero from "../src/components/Hero";
import PageHead from "../src/components/PageHead";

import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import WorkExperience from "../src/components/WorkExperience";
import FeedbackCard from "../src/components/Cards/FeedbackCard";

interface AboutProps {
  page: StaticPage;
  feedbacks: Feedback[];
  workExp: WorkExp[];
}

export default function About({ page, workExp, feedbacks }: AboutProps) {
  return (
    <>
      <PageHead page={page} />
      <motion.main className="container flex max-w-5xl flex-col items-center gap-24 overflow-x-hidden py-24">
        <Hero.Page page={page} />
        <SectionsWrapper>
          <SectionTitle title="Work Experiences" />
          {workExp
            .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
            .map((w: WorkExp) => {
              return <WorkExperience job={w} key={`about-${w.id}`} />;
            })}
        </SectionsWrapper>
        <SectionsWrapper>
          <SectionTitle title="feedbacks & testimonials" />
          {feedbacks.map((f) => {
            return <FeedbackCard.Single feedback={f} key={f.id} />;
          })}
        </SectionsWrapper>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "About"
  );

  const feedbacks = await notionService.getFeedbacks();
  const workExp = await notionService.getWorkExp();

  return {
    props: {
      page,
      feedbacks,
      workExp,
    },
  };
};

import NotionService from "./api/notion";
import { WorkExp, StaticPage, Feedback } from "../@types/schema";
import WorkExperience from "../src/components/WorkExperience";
import PageHead from "../src/components/PageHead";
import Hero from "../src/components/Hero";
import { motion } from "framer-motion";
import { motionVariants } from "../src/utils/motionVariants";
import FeedbackCard from "../src/components/Cards/FeedbackCard";
import SectionTitle from "../src/components/SectionTitle";

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
  return (
    <>
      <PageHead page={page} />
      <motion.main
        variants={motionVariants.pageVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className="container flex max-w-5xl flex-col items-center space-y-24 px-4 md:px-12 xl:max-w-6xl"
      >
        <Hero.Page page={page} />
        <section className="mb-24 flex max-w-4xl flex-col space-y-16 px-4 py-24 lg:px-0">
          <div className="flex space-x-16">
            <SectionTitle title="yo yo yo" />
            <div className="w-4/6">
              <p className="text-xl leading-relaxed opacity-70">
                ost.details.description
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
      </motion.main>
    </>
  );
}

export async function getStaticProps() {
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
}

import { GetStaticProps } from "next";
import { NotionPost, StaticPage } from "../src/types";
import NotionService from "./api/notion";
import Hero from "../src/components/Hero";
import PageHead from "../src/components/PageHead";
import { motion } from "framer-motion";
import ContentCard from "../src/components/Cards/ContentCard";
import SectionTitle from "../src/components/SectionTitle";

interface FourOhFourProps {
  page: StaticPage;
  posts: NotionPost[];
}

export default function FourOhFour({
  page,
  posts,
}: FourOhFourProps): JSX.Element {
  return (
    <>
      <div className="fixed -z-50 h-screen w-screen">
        <motion.div
          initial="initial"
          animate="target"
          onChange={() => motion.animate}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
          className="absolute top-1/2 left-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <PageHead page={page} />
      <motion.main
        initial="hidden"
        animate="enter"
        onChange={() => motion.animate}
        exit="exit"
        transition={{ type: "linear" }}
        className="container flex max-w-5xl flex-col items-center gap-24 px-4 md:px-12 xl:max-w-6xl"
      >
        <Hero.Page page={page} />
        <section className="flex w-full flex-col px-4 py-24 lg:px-0">
          <SectionTitle title="highlighted case studies" className="mb-16" />
          <div className="flex items-center gap-4">
            <div className="flex w-full flex-col gap-8 md:gap-12 lg:w-1/2 lg:pr-12">
              {posts
                .filter((p) => p.properties.published)
                .sort(
                  (a: NotionPost, b: NotionPost) =>
                    a.properties.number - b.properties.number
                )
                .map((p: NotionPost) => {
                  return <ContentCard post={p} key={p.properties.id} />;
                })}
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "404"
  );

  const posts = (await notionService.getCaseStudies()).filter(
    (p) => p.properties.tag !== "Side Project"
  );

  return {
    props: {
      page,
      posts,
    },
  };
};

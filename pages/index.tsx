import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { NotionPost, StaticPage } from "../src/types";
import NotionService from "./api/notion";
import Hero from "../src/components/Hero";
import PageHead from "../src/components/PageHead";

import ContentCard from "../src/components/Cards/ContentCard/Content";
import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import { useTheme } from "../src/contexts/ThemeContext";

interface HomeProps {
  page: StaticPage;
  works: NotionPost[];
}

export default function Home({ page, works }: HomeProps) {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <>
      <PageHead page={page} />
      <motion.main
        className={`container flex flex-col items-center gap-24 overflow-x-hidden py-32 md:max-w-4xl md:gap-48 2xl:max-w-6xl ${themeClasses.bg} ${themeClasses.color}`}
      >
        <Hero.Page page={page} />
        <SectionsWrapper>
          <SectionTitle title="case studies" />
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

  const works = posts.filter((p) => p.properties.tag !== "Side Project");

  return {
    props: {
      page,
      works,
    },
  };
};

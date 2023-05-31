import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { NotionPost, StaticPage } from "../src/types";
import NotionService from "./api/notion";
import PageHead from "../src/components/PageHead";

import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import SideProjectsCard from "../src/components/Cards/SideProjectsCard/SideProjectsCard";

interface SideProjectsProps {
  page: StaticPage;
  sideProjects: NotionPost[];
}

export default function SideProjects({
  page,
  sideProjects,
}: SideProjectsProps) {
  return (
    <>
      <PageHead page={page} />
      <motion.main className="container flex max-w-4xl flex-col items-center gap-48 overflow-x-hidden py-48">
        <SectionsWrapper>
          <SectionTitle title="on the side" className="mb-12" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-16">
            {sideProjects
              .sort(
                (a: NotionPost, b: NotionPost) =>
                  a.properties.number - b.properties.number
              )
              .map((p: NotionPost) => {
                return <SideProjectsCard post={p} key={p.properties.id} />;
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
    (data) => data.name === "Side Projects"
  );
  const posts = await notionService.getCaseStudies();
  const sideProjects = posts.filter((p) => p.properties.tag === "Side Project");

  return {
    props: {
      page,
      sideProjects,
    },
  };
};

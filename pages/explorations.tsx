import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { Exploration, StaticPage } from "../src/types";
import NotionService from "./api/notion";
import PageHead from "../src/components/PageHead";
import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import ExplorationsCard from "../src/components/Cards/ExplorationsCard/ExplorationsCard";

interface HomeProps {
  page: StaticPage;
  explorations: Exploration[];
}

export default function Home({ page, explorations }: HomeProps) {
  return (
    <>
      <PageHead page={page} />
      <motion.main className="container flex max-w-5xl flex-col items-center gap-24 overflow-x-hidden py-24">
        <SectionsWrapper>
          <SectionTitle title="explorations" className="mb-16" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {explorations.map((p: Exploration) => {
              return <ExplorationsCard exploration={p} key={p.id} />;
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
    (data) => data.name === "Explorations"
  );

  const explorations = await notionService.getExplorations();

  return {
    props: {
      page,
      explorations,
    },
  };
};

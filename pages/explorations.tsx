import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { Exploration, StaticPage } from "../src/types";
import NotionService from "./api/notion";
import PageHead from "../src/components/PageHead";
import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import ExplorationsCard from "../src/components/Cards/ExplorationsCard/ExplorationsCard";

interface ExplorationsProps {
  page: StaticPage;
  explorations: Exploration[];
}

export default function Explorations({ page, explorations }: ExplorationsProps) {
  return (
    <>
      <PageHead page={page} />
      <motion.main className="container 2xl:max-w-6xl flex max-w-4xl flex-col items-center gap-48 overflow-x-hidden py-32">
        <SectionsWrapper>
          <SectionTitle title="explorations" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
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

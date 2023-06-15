import { GetStaticProps } from "next";
import { StaticPage, Feedback, WorkExp } from "../src/types";
import NotionService from "./api/notion";
import Image from "next/image";
import PageHead from "../src/components/PageHead";

import SectionTitle from "../src/components/SectionTitle";
import SectionsWrapper from "../src/components/SectionsWrapper";
import WorkExperience from "../src/components/WorkExperience";
import FeedbackCard from "../src/components/Cards/FeedbackCard";
import MainWrapper from "../src/components/MainWrapper";
import { useTheme } from "../src/contexts/ThemeContext";
import Button from "../src/components/Button";
import { PaperPlaneIcon } from "../src/icons";
import cx from "classnames";
import Layout from "../src/components/Layout";

interface AboutProps {
  page: StaticPage;
  feedbacks: Feedback[];
  workExp: WorkExp[];
}

export default function About({ page, workExp, feedbacks }: AboutProps) {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <Layout>
      <PageHead page={page} />
      <MainWrapper>
        <div className="flex w-full flex-col gap-4 px-4 md:flex-row md:gap-12 md:px-12">
          <div className="relative flex aspect-square h-fit w-full items-center justify-center md:w-1/5">
            <Image
              src={"/ak.jpg"}
              alt="Ali Kemal Akcay – Product Designer"
              width={512}
              height={512}
              priority
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-4xl font-semibold md:text-5xl" key="hero_title">
              {page.heroTitle}
            </h1>
            <p className="text-xl font-light opacity-70">{page.heroText}</p>
            <div
              className={`${themeClasses.color} flex w-full flex-col items-center justify-between gap-4 md:flex-row`}
            >
              <Button.Primary
                href="mailto:hey@akml.io"
                text="hey@akml.io"
                icon={<PaperPlaneIcon className="h-5 w-5" />}
              />
              <div className="flex justify-between gap-4">
                <Button.Social type="figma" />
                <Button.Social type="github" />
                <Button.Social type="linkedin" />
                <Button.Social type="twitter" />
                <Button.Social type="dribbble" />
              </div>
            </div>
          </div>
        </div>
        <SectionsWrapper row>
          <SectionTitle row title="Work Experiences" />
          <div className="flex w-full flex-col gap-8 md:gap-12">
            {workExp
              .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
              .map((w: WorkExp) => {
                return <WorkExperience job={w} key={`about-${w.id}`} />;
              })}
          </div>
        </SectionsWrapper>
        <SectionsWrapper row>
          <SectionTitle row title="skills" />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 md:gap-x-16">
            {page.extra.split(",").map((s) => {
              return (
                <li
                  key={s}
                  className={cx(
                    "col-span-1 whitespace-nowrap font-muli text-xl font-normal text-opacity-60",
                    themeClasses.color
                  )}
                >
                  – {s}
                </li>
              );
            })}
          </ul>
        </SectionsWrapper>
        <SectionsWrapper row>
          <SectionTitle row title="feedbacks & testimonials" />
          <div className="flex flex-col gap-12">
            {feedbacks.map((f) => {
              return <FeedbackCard.Single feedback={f} key={f.id} />;
            })}
          </div>
        </SectionsWrapper>
      </MainWrapper>
    </Layout>
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

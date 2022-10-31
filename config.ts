import * as dotenv from "dotenv";
import { cleanEnv, str } from "envalid";

dotenv.config({ path: ".env" });

const env = cleanEnv(process.env, {
  APP_ENV: str<"dev" | "prod">({ choices: ["dev", "prod"], default: "dev" }),
  NOTION_API_KEY: str(),
  NOTION_DATABASE_WORK_EXPERIENCES: str(),
  NOTION_DATABASE_CASE_STUDIES: str(),
  NOTION_DATABASE_SIDE_PROJECTS: str(),
  NOTION_DATABASE_PAGES: str(),
  NOTION_EXPLORATIONS: str(),
  NOTION_FEEDBACKS: str(),
  PAGE_PASSWORD: str(),
});

const notionEnv = () => {
  const {
    NOTION_API_KEY: apiKey,
    NOTION_DATABASE_WORK_EXPERIENCES: workExperiences,
    NOTION_DATABASE_CASE_STUDIES: caseStudies,
    NOTION_DATABASE_SIDE_PROJECTS: sideProjects,
    NOTION_DATABASE_PAGES: pages,
    NOTION_FEEDBACKS: feedbacks,
    NOTION_EXPLORATIONS: explorations,
  } = cleanEnv(process.env, {
    NOTION_API_KEY: str(),
    NOTION_DATABASE_WORK_EXPERIENCES: str(),
    NOTION_DATABASE_CASE_STUDIES: str(),
    NOTION_DATABASE_SIDE_PROJECTS: str(),
    NOTION_DATABASE_PAGES: str(),
    NOTION_FEEDBACKS: str(),
    NOTION_EXPLORATIONS: str(),
  });
  return {
    apiKey,
    workExperiences,
    caseStudies,
    sideProjects,
    pages,
    feedbacks,
    explorations,
  };
};

let resolvedNotionEnv: ReturnType<typeof notionEnv>;

export const config = {
  env: env.APP_ENV as "dev" | "prod",
  notion: () => {
    if (!resolvedNotionEnv) {
      resolvedNotionEnv = notionEnv();
    }
    return resolvedNotionEnv;
  },
  pagePass: env.PAGE_PASSWORD,
};

export type AppConfig = typeof config;

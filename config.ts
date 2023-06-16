import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const config = {
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_CASE_STUDIES: process.env.NOTION_DATABASE_CASE_STUDIES,
  NOTION_DATABASE_SIDE_PROJECTS: process.env.NOTION_DATABASE_SIDE_PROJECTS,
  NOTION_FEEDBACKS: process.env.NOTION_FEEDBACKS,
  NOTION_EXPLORATIONS: process.env.NOTION_EXPLORATIONS,
  NOTION_DATABASE_PAGES: process.env.NOTION_DATABASE_PAGES,
  NOTION_DATABASE_WORK_EXPERIENCES:
    process.env.NOTION_DATABASE_WORK_EXPERIENCES,
  PAGE_PASSWORD: process.env.PAGE_PASSWORD,
};

import * as dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config({ path: '.env' });

const env = cleanEnv(process.env, {
  APP_ENV: str<'dev' | 'prod'>({ choices: ['dev', 'prod'], default: 'dev' }),
  N_API_KEY: str(),
  N_DB_WORK: str(),
  N_DB_CAREER_HIGHLIGHTS: str(),
  N_DB_SIDE_PROJECTS: str(),
  N_DB_PAGES: str(),
  N_FEEDBACKS: str(),
});

const notionEnv = () => {
  const {
    N_API_KEY: notionApiKey,
    N_DB_WORK: notionWork,
    N_DB_CAREER_HIGHLIGHTS: notionCareer,
    N_DB_SIDE_PROJECTS: notionSideProjects,
    N_DB_PAGES: notionPages,
    N_FEEDBACKS: notionFeedbacks,
  } = cleanEnv(process.env, {
    N_API_KEY: str(),
    N_DB_WORK: str(),
    N_DB_CAREER_HIGHLIGHTS: str(),
    N_DB_SIDE_PROJECTS: str(),
    N_DB_PAGES: str(),
    N_FEEDBACKS: str(),
  });
  return {
    notionApiKey,
    notionWork,
    notionCareer,
    notionSideProjects,
    notionPages,
    notionFeedbacks,
  };
};

let resolvedNotionEnv: ReturnType<typeof notionEnv>;

export const config = {
  env: env.APP_ENV as 'dev' | 'prod',
  // notion: () => {
  //   if (!resolvedNotionEnv) {
  //     resolvedNotionEnv = notionEnv();
  //   }
  //   return notionEnv;
  // },
  notion: {
    apiKey: env.N_API_KEY,
    workExp: env.N_DB_WORK,
    portfolioPosts: env.N_DB_CAREER_HIGHLIGHTS,
    sideProjects: env.N_DB_SIDE_PROJECTS,
    staticPages: env.N_DB_PAGES,
    feedbacks: env.N_FEEDBACKS,
  },
};

export type AppConfig = typeof config;

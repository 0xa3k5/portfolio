import * as dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config({ path: '.env' });

const env = cleanEnv(process.env, {
  APP_ENV: str<'dev' | 'prod'>({ choices: ['dev', 'prod'], default: 'dev' }),
  N_API_KEY: str(),
  N_DB_WORK: str(),
  N_DB_CAREER_HIGHLIGHTS: str(),
  N_DB_SIDE_PROJECTS: str(),
});

const notionEnv = () => {
  const {
    N_API_KEY: notionApiKey,
    N_DB_WORK: notionWork,
    N_DB_CAREER_HIGHLIGHTS: notionCareer,
    N_DB_SIDE_PROJECTS: notionSideProjects,
  } = cleanEnv(process.env, {
    N_API_KEY: str(),
    N_DB_WORK: str(),
    N_DB_CAREER_HIGHLIGHTS: str(),
    N_DB_SIDE_PROJECTS: str(),
  });
  return { notionApiKey, notionWork, notionCareer, notionSideProjects };
};

let resolvedNotionEnv: ReturnType<typeof notionEnv>;

export const config = {
  env: env.APP_ENV as 'dev' | 'prod',
  //   notion: () => {
  //     if (!resolvedNotionEnv) {
  //       resolvedNotionEnv = notionEnv();
  //     }
  //     return notionEnv;
  //   },
  notion: {
    apiKey: env.N_API_KEY,
    workExp: env.N_DB_WORK,
    portfolioPosts: env.N_DB_CAREER_HIGHLIGHTS,
    sideProjects: env.N_DB_SIDE_PROJECTS,
  },
};

export type AppConfig = typeof config;

export type NotionPost = {
  number: number;
  client: string;
  website: string;
  id: string;
  published: boolean;
  vertical?: boolean;
  password: boolean;
  slug: string;
  img: string;
  title: string;
  description: string;
  period: string;
  logo: string;
  website: string;
  client: string;
  bgColor: string;
  color: string;
  type: string;
  position: string;
  contributions: string;
  overviewImg: string;
};

export type WorkExp = {
  id: string;
  num: number;
  published: boolean;
  logo: string;
  website: string;
  role: string;
  company: string;
  tagline: string;
  description: string;
  period: string;
};

export type NotionPageDetail = {
  post: NotionPost;
  markdown: string;
};

export type StaticPages = {
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
};

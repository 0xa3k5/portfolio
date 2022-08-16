export type NotionPost = {
  id: string;
  published: boolean;
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
  vertical?: boolean;
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
  post: Post;
  markdown: string;
};

export type StaticPages = {
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
};

export type SideProject = {
  id: string;
  img: string;
  title: string;
  description: string;
  date: string;
  website: string | null;
  logo: string | null;
  number: number;
};

export type NotionPost = {
  org: {
    logo: string;
    website: string | null;
    orgName: string;
  };
  properties: {
    id: string;
    number: number;
    slug: string;
    published: boolean;
    password: boolean;
    bgColor: string;
    color: string;
    tag: string;
  };
  details: {
    img: string;
    title: string;
    type: string;
    description: string;
    period: string;
    position: string;
    contributions: string;
    overviewImg: string;
  };
  feedbacks: {
    id: string;
    relationIds: string[];
  };
};

export type Feedback = {
  id: string;
  relationId: string;
  name?: string;
  img?: string;
  role?: string;
  orgName?: string;
  project?: string;
  feedback?: string;
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
  markdown: string;
  post?: NotionPost;
};

export type StaticPage = {
  name: string;
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
  id: string;
  slug?: string;
};

export type Exploration = {
  id: string;
  type: "video" | "image";
  name: string;
  img: string;
};

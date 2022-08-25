export type NotionPost = {
  org: {
    logo: string;
    website: string;
    orgName: string;
  };
  properties: {
    id: string;
    number: number;
    slug: string;
    published: boolean;
    vertical?: boolean;
    password: boolean;
    bgColor: string;
    color: string;
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
  post: NotionPost;
  markdown: string;
};

export type StaticPages = {
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
};

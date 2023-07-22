import { MdStringObject } from "notion-to-md/build/types";

export type SideProject = {
  id: string;
  title: string;
  description: string;
  date: number;
  website: string | null;
  logo: string | null;
  thumbnail: string[] | null;
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
    categories: string[];
    collaborators: {
      id: string;
      relationIds: string[];
    };
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
  company: string;
  tagline: string;
  period: string;
  collaborators: {
    id: string;
    relationIds: string[];
  };
};

export type NotionPageDetail = {
  markdown: MdStringObject;
  post?: NotionPost;
};

export type StaticPage = {
  name: string;
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
  id: string;
  slug: string;
  extra: string | null;
};

export type Exploration = {
  id: string;
  type: "video" | "image";
  name: string;
  img: string;
};

export type Craft = {
  id: string;
  slug: string;
  title: string;
  tags?: string[];
  date: string;
};

export type Bookmarks = {
  isTool: boolean;
  name: string;
  url: string;
  tags: string[];
  createdAt: string;
  favicon?: string;
};

export type Collaborator = {
  id: string;
  image: string;
  name: string;
  role: string;
  url: string;
};

export type Idea = {
  id: string;
  slug: string;
  private: boolean;
  name: string;
  date: string;
  tags: string[];
  killedBy: string | null;
  killedByLink: string | null;
};

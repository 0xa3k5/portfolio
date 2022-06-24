export type Post = {
  id: string;
  slug: string;
  img: string;
  title: string;
  description: string;
  period: string;
  logo: string;
  website: string;
};

export type WorkExp = {
  id: string;
  logo: string;
  website: string;
  role: string;
  company: string;
  description: string;
  period: string;
};

export type PostDetail = {
  post: Post;
  markdown: string;
};
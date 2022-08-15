export type Post = {
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
  description: string;
  period: string;
  responsibilities?: string;
};

export type PostDetail = {
  post: Post;
  markdown: string;
};

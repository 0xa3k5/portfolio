export type PortfolioPost = {
  id: string;
  slug: string;
  img: string;
  title: string;
  description: string;
  period: string;
  logo: string;
  website: string;
};

export type WorkExperience = {
  id: string;
  logo: string;
  website: string;
  role: string;
  company: string;
  description: string;
  period: string;
};

export type PortfolioDetail = {
  portfolioPost: PortfolioPost;
  markdown: string;
};

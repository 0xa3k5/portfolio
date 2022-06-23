export type PortfolioPost = {
  id: string;
  slug: string;
  img: string;
  title: string;
  description: string;
  period: string;
  logo: string;
};

export type WorkExperience = {
  id: string;
  img: string;
  role: string;
  company: string;
  description: string;
  period: string;
};

export type PortfolioDetail = {
  portfolioPost: PortfolioPost;
  markdown: string;
};

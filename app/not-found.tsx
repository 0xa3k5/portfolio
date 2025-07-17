import { NotionPost } from "../src/types";
import NotionService from "@/src/pages/api/notion";
import { SectionTitle } from "@/src/components/section-title";
import { PortfolioCard } from "@/src/components/portfolio-card";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const notionService = new NotionService();
  const staticPages = await notionService.getStaticPage();

  const page =
    staticPages.find((page) => page.slug.toLowerCase() === "404") ||
    staticPages[0];

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function FourOhFour() {
  const notionService = new NotionService();
  const page = (await notionService.getStaticPage()).find(
    (page) => page.slug === "404"
  );
  const posts = await notionService.getCaseStudies();

  return (
    <div className="flex flex-col gap-8 my-40">
      <div className="flex w-full flex-col gap-8 sm:mt-0 max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-2xl text-4xl font-semibold" key="hero_title">
            {page?.heroTitle}
          </h1>
          <p className="max-w-xl text-xl font-light opacity-70">
            {page?.heroText}
          </p>
        </div>
      </div>
      <div
        className={`
        flex flex-col gap-4 w-full max-w-5xl px-8 mx-auto
        
        `}
      >
        <SectionTitle title="case studies" orientation="vertical" />
        <div className="flex flex-col gap-8 md:gap-12">
          {posts
            .filter((p) => p.properties.published)
            .sort(
              (a: NotionPost, b: NotionPost) =>
                a.properties.number - b.properties.number
            )
            .map((p: NotionPost) => {
              return <PortfolioCard post={p} key={p.properties.id} />;
            })}
        </div>
      </div>
    </div>
  );
}

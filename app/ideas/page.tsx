import { Idea } from "@/src/types";
import NotionService from "@/src/pages/api/notion";
import { SectionTitle } from "@/src/components/section-title";
import { cx } from "@/src/utils/cx";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Chip } from "@/src/components/chip";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const notionService = new NotionService();
  const staticPages = await notionService.getStaticPage();

  const page =
    staticPages.find((page) => page.slug.toLowerCase() === "ideas") ||
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

export default async function IdeasPage() {
  const notionService = new NotionService();
  const ideas = await notionService.getIdeas();

  const sortedIdeas = ideas.posts.sort(
    (a, b) => parseFloat(b.date) - parseFloat(a.date)
  );

  return (
    <div className="flex flex-col gap-8 my-40">
      <SectionTitle
        title="My Open Source ideas with random brain crumbs"
        subtext="feel free to copy/steal/improve and build any of them"
        className="w-full"
        orientation="vertical"
      />
      {sortedIdeas.map((idea) => {
        return (
          <IdeaCard
            key={idea.id}
            idea={idea}
            md={ideas.md[idea.slug]?.markdown.parent}
          />
        );
      })}
    </div>
  );
}

const IdeaCard = ({ idea, md }: { idea: Idea; md?: string }) => {
  return (
    <details className="flex w-3xl flex-col gap-6 border-b border-foam/10 pb-8 last-of-type:border-none group">
      <summary className="cursor-pointer list-none">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="opacity-60 text-sm mb-2">
              {new Date(idea.date).toDateString()}
            </span>
            <h6 className="font-sans text-2xl font-bold">{idea.name}</h6>
          </div>
          <ChevronLeftIcon
            className={cx(
              "h-5 w-5 duration-150",
              "group-open:rotate-90 -rotate-90"
            )}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag, i) => (
            <Chip key={i} text={tag} />
          ))}
        </div>
      </summary>

      {md && (
        <article className="prose-lg">
          <ReactMarkdown>{md}</ReactMarkdown>
        </article>
      )}

      {idea.killedBy && (
        <div className="flex flex-col gap-2 rounded-r-xl border-l-2 border-foam/20 px-8 py-4 bg-foam/5">
          <span className="">☠️ Killed By:</span>
          {idea.killedByLink ? (
            <Link
              href={idea.killedByLink}
              target="_blank"
              className="duration-150 text-daisy"
            >
              <span className="">{idea.killedBy}</span>
            </Link>
          ) : (
            <span className="">{idea.killedBy}</span>
          )}
        </div>
      )}
    </details>
  );
};

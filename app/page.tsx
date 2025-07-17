import Link from "next/link";
import Image from "next/image";
import { Feedback as TFeedback } from "@/src/types";
import { Hero } from "@/src/components/home-hero/hero";
import { SectionTitle } from "@/src/components/section-title";
import { Collaborator } from "@/src/components/collaborator";
import {
  NotionPost,
  SideProject,
  Collaborator as TCollaborator,
} from "@/src/types";
import NotionService from "@/src/pages/api/notion";
import { cx } from "@/src/utils/cx";
import Button from "@/src/components/button";
import { RightArrowIcon } from "@/src/components/icons";
import { WorkExp } from "@/src/types";
import { Tooltip } from "@/src/components/tooltip";
import { Metadata } from "next";
import { getIconByProp } from "@/src/utils/icon-by-prop";

export async function generateMetadata(): Promise<Metadata> {
  const notionService = new NotionService();
  const staticPages = await notionService.getStaticPage();

  const homePage =
    staticPages.find((page) => page.slug.toLowerCase() === "home") || staticPages[1];

  return {
    title: homePage.title,
    description: homePage.description,
    openGraph: {
      title: homePage.title,
      description: homePage.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: homePage.title,
      description: homePage.description,
    },
  };
}

export default async function Home() {
  const notionService = new NotionService();
  const workExp = await notionService.getWorkExp();
  const collaborators = await notionService.getCollaborators();
  const sideProjects = await notionService.getSideProjects();
  const feedback = await notionService.getFeedbacks();
  const posts = await notionService.getCaseStudies();

  return (
    <div className="flex flex-col w-full my-40">
      <Hero />
      <Section orientation="vertical">
        <div className="flex flex-col w-full pt-10 pb-20">
          <WorkExperience workExp={workExp} collaborators={collaborators} />
        </div>
      </Section>

      <Portfolio posts={posts} />
      <Section orientation="vertical" className="mt-24">
        <SectionTitle title="on the side" orientation="vertical" />
        <SideProjects sideProjects={sideProjects} />
      </Section>
      <Section orientation="vertical" className="mt-24">
        <SectionTitle title="feedback" orientation="vertical" />
        <Feedback feedbacks={feedback} />
      </Section>
    </div>
  );
}

const Section = ({
  children,
  orientation = "horizontal",
  className,
}: {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) => {
  return (
    <div
      data-orientation={orientation}
      className={cx(
        `
        flex gap-4 w-full max-w-5xl px-8 mx-auto
        data-[orientation=horizontal]:flex-row
        data-[orientation=vertical]:flex-col
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

const WorkExperience = ({
  workExp,
  collaborators,
}: {
  workExp: WorkExp[];
  collaborators: TCollaborator[];
}) => {
  return (
    <div className="flex flex-col">
      {workExp.map((job) => {
        return (
          <div
            key={job.id}
            className="flex flex-col sm:items-center justify-between gap-4 border-b border-foam/10 py-6 last-of-type:border-none sm:flex-row"
          >
            <div className="flex w-1/2 flex-col  gap-4">
              <span className="text-foam/40">{job.period}</span>
              <Link
                href={job.website}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full flex-row items-center gap-4"
              >
                <h6 className="text-2xl">{job.company}</h6>
              </Link>
            </div>
            <ul className="grid sm:grid-cols-6 grid-cols-12 gap-2">
              {collaborators
                .filter((c) => job.collaborators.relationIds.includes(c.id))
                .map((collab) => {
                  return <Collaborator collab={collab} key={collab.id} />;
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const SideProjects = ({ sideProjects }: { sideProjects: SideProject[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sideProjects
        .sort((a, b) => b.date - a.date)
        .map((side) => {
          return (
            <Link
              key={side.id}
              href={side.website ?? ""}
              target="_blank"
              className={cx(
                `
                group flex h-full w-full flex-col justify-between gap-8 rounded-xl px-4 py-6 duration-150 md:p-8
                bg-foam/5 hover:bg-midnight/10
                border border-foam/5
                `,
                side.website ?? "pointer-events-none"
              )}
            >
              <span className="flex w-full items-start justify-between">
                <span className="flex flex-col">
                  <span
                    className={`flex rounded-full border-foam/10 mb-2 w-fit border px-2 py-1`}
                  >
                    <span className="text-sm opacity-60">{side.date}</span>
                  </span>
                  <h6 className="text-2xl">{side.title}</h6>
                  <span className="opacity-60">{side.description}</span>
                </span>
                {side.website && (
                  <Button className="">
                    <RightArrowIcon className="size-5 -rotate-45 shrink-0 duration-150 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Button>
                )}
              </span>
              <span className="flex w-full gap-2">
                {side.thumbnail && side.thumbnail.length
                  ? side.thumbnail.map((thumbnail, i) => {
                      return (
                        <span
                          key={i}
                          className="relative flex size-32 overflow-clip rounded-xl"
                        >
                          <Image
                            alt={side.title}
                            src={thumbnail}
                            width={512}
                            height={512}
                            priority
                            style={{
                              objectFit: "cover",
                            }}
                            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                          />
                        </span>
                      );
                    })
                  : null}
              </span>
            </Link>
          );
        })}
    </div>
  );
};

const Portfolio = ({ posts }: { posts: NotionPost[] }) => {
  return posts
    .sort((a, b) => a.properties.number - b.properties.number)
    .map((post) => (
      <div
        key={post.properties.id}
        className="relative flex min-h-[60dvh] w-screen items-center md:min-h-screen justify-center"
        style={{
          backgroundColor: `#${post.properties.bgColor}`,
          color: `#${post.properties.color}`,
        }}
      >
        <div className="container flex max-w-5xl flex-col items-center space-y-12 py-8 sm:py-24">
          <div className="flex w-full justify-between gap-20">
            <div className="space-y-4">
              <h2 className="max-w-2xl text-4xl">{post.details.title}</h2>
              <p className="hidden max-w-2xl text-lg opacity-60 sm:block">
                {post.details.description}
              </p>
              <div className="flex gap-2">
                {post.details.categories.length > 0
                  ? post.details.categories.map((c, i) => (
                      <span
                        key={i}
                        className="flex w-fit rounded-full border px-3 py-1 text-sm"
                        style={{
                          borderColor: `#${post.properties.color}1A`,
                        }}
                      >
                        {c}
                      </span>
                    ))
                  : null}
              </div>
            </div>
            <Link
              data-published={post.properties.published}
              href={`/works/${post.properties.slug}`}
              className={`
                      group flex-wrap relative flex h-fit w-fit items-center gap-2 whitespace-nowrap rounded-xl px-4 py-4 duration-100
                      data-[published=false]:pointer-events-none
                      `}
              style={{
                backgroundColor: `#${post.properties.color}1a`,
                color: `#${post.properties.color}`,
              }}
            >
              <Tooltip
                text="Read Case Study"
                position="bottom"
                className="hidden group-hover:block"
              />

              {getIconByProp(post.properties)}
            </Link>
          </div>
          <div className="relative aspect-square w-full">
            <Image
              src={post.details.overviewImg}
              alt=""
              priority
              fill
              className="object-contain object-top"
            />
          </div>
        </div>
      </div>
    ));
};

const Feedback = ({ feedbacks }: { feedbacks: TFeedback[] }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {feedbacks.map((f) => {
        return (
          <div
            key={f.id}
            className={cx(
              "col-span-1 flex h-fit flex-col items-start gap-6 rounded-xl p-8 border border-foam/10"
            )}
          >
            <div className="border-b border-foam/10 flex w-full items-center gap-4 pb-8">
              {f.img && (
                <div className="relative size-12 shrink-0 overflow-clip rounded-full">
                  <Image
                    src={f.img}
                    alt={f.name ?? "avatar"}
                    fill
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                    }}
                    sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-lg">{f.name}</span>
                <span className="opacity-40">
                  {f.role} @{f.orgName}
                </span>
              </div>
            </div>
            <span className="text-lg font-light leading-normal tracking-wide">
              {f.feedback}
            </span>
          </div>
        );
      })}
    </div>
  );
};

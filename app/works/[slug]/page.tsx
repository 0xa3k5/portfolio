import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  Collaborator as TCollaborator,
  Feedback,
  NotionPost,
} from "@/src/types";
import NotionService from "@/src/pages/api/notion";
import Link from "next/link";
import { cx } from "@/src/utils/cx";
import { LockIcon, RightArrowIcon } from "@/src/components/icons";
import { Collaborator } from "@/src/components/collaborator";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const notionService = new NotionService();
    const databaseId = NotionService.NOTION_DATABASES.caseStudies;

    const pageDetail = await notionService.getNotionPageDetail(
      decodedSlug,
      databaseId,
      "post"
    );
    return {
      title: pageDetail.post?.details.title,
      description: pageDetail.post?.details.description,
      openGraph: {
        title: pageDetail.post?.details.title,
        description: pageDetail.post?.details.description,
        type: "website",
        images: pageDetail.post?.details.img
          ? [pageDetail.post?.details.img]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: pageDetail.post?.details.title,
        description: pageDetail.post?.details.description,
        images: pageDetail.post?.details.img
          ? [pageDetail.post?.details.img]
          : undefined,
      },
    };
  } catch {
    return {
      title: "Work Not Found",
      description: "The requested work could not be found.",
    };
  }
}

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const notionService = new NotionService();
    const databaseId = NotionService.NOTION_DATABASES.caseStudies;

    const pageDetail = await notionService.getNotionPageDetail(
      decodedSlug,
      databaseId,
      "post"
    );

    if (!pageDetail || !pageDetail.post) {
      return <div>Post not found</div>;
    }

    const post = pageDetail.post;
    const markdown = pageDetail.markdown;

    const feedbacks = await notionService.getFeedbacks();
    const collaborators = await notionService.getCollaborators();

    const postFeedbacks = feedbacks.filter((f: Feedback) =>
      post.feedbacks.relationIds.includes(f.id)
    );
    const postCollaborators = collaborators.filter((c: TCollaborator) =>
      post.details.collaborators.relationIds.includes(c.id)
    );

    const posts = await notionService.getCaseStudies();

    const currentPostIndex = posts.findIndex(
      (page) => page.properties.slug === slug
    );

    const prevPost = posts[currentPostIndex - 1] || posts[posts.length - 1];
    const nextPost = posts[currentPostIndex + 1] || posts[0];

    return post.properties.password === false ? (
      <main className="flex w-full flex-col items-center">
        <Hero post={post} />
        <div className="flex w-full max-w-5xl flex-col items-center gap-24 px-4 py-24">
          <Overview post={post} collaborators={postCollaborators} />
          <article
            className={`
              prose prose-xl prose-invert 
              prose-headings:font-vollkorn prose-headings:font-semibold 
              prose-h1:text-3xl prose-h3:font-normal 
              prose-p:font-light
              prose-p:leading-snug 
              prose-p:tracking-wide 
              prose-a:text-daisy 
              prose-a:duration-150 
              prose-a:hover:text-white 
              prose-ul:font-light 
              prose-ul:tracking-wider 
              prose-img:rounded-xl
              md:prose-h1:text-5xl
              `}
          >
            <ReactMarkdown>{markdown["parent"]}</ReactMarkdown>
          </article>
          {postFeedbacks.length > 0 &&
            postFeedbacks.map((f) => {
              return <FeedbackCard feedback={f} key={f.id} />;
            })}
          <MorePosts posts={[prevPost, nextPost]} />
        </div>
      </main>
    ) : null;
  } catch (error) {
    console.error("Error fetching page detail:", error);
    return <div>Error loading page</div>;
  }
}

const Hero = ({ post }: { post: NotionPost }) => {
  return (
    <div
      className="flex h-[70vh] w-full md:h-[90vh] items-center justify-center pb-4 md:gap-24 md:pb-8 px-4 md:px-16"
      style={{
        backgroundColor: `#${post.properties.bgColor}`,
        color: `#${post.properties.color}`,
      }}
    >
      <div className="flex max-w-lg flex-col gap-2 md:gap-4 md:pl-16 ">
        <h1 className="text-4xl font-bold md:leading-snug">
          {post.details.title}
        </h1>
        <p className="max-w-md text-xl opacity-80">
          {post.details.description}
        </p>
      </div>
      <div className="relative hidden h-2/3 w-1/2 md:block shrink-0">
        <Image
          src={post.details.img}
          alt={post.details.title}
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "center",
            maxWidth: "100%",
          }}
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
        />
      </div>
    </div>
  );
};

const MorePosts = ({ posts }: { posts: NotionPost[] }) => {
  return (
    <div className="flex w-full max-w-3xl flex-col justify-between gap-8 md:flex-row md:px-16">
      {posts.map((p, i) => {
        return (
          <Link
            key={p.properties.id}
            href={`/works/${encodeURIComponent(p.properties.slug)}`}
            passHref
            className=""
          >
            <div
              className={cx(
                "group flex flex-col gap-4",
                i === 0 ? "items-start" : "items-end"
              )}
            >
              <div
                className={cx(
                  "flex gap-2 duration-150",
                  i === 0 ? "flex-row" : "flex-row-reverse",
                  `text-foam/40 group-hover:text-foam`
                )}
              >
                {i === 0 ? (
                  <RightArrowIcon className="w-6 rotate-180 duration-150 group-hover:-translate-x-1/2" />
                ) : (
                  <RightArrowIcon className="w-6 duration-150 group-hover:translate-x-1/2" />
                )}
                <p className="text-md uppercase tracking-widest">
                  {i === 0 ? "Previous" : "Next"}
                </p>
              </div>

              <h6
                className={cx(
                  "max-w-xs text-3xl font-medium leading-snug",
                  i === 0 ? "text-left" : "text-right",
                  `hover:text-daisy`
                )}
              >
                <span className="inline-block">
                  {p.properties.password && (
                    <LockIcon className="mr-2 shrink-0 opacity-100" />
                  )}
                </span>
                {p.details.title}
              </h6>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Overview = ({
  post,
  collaborators,
}: {
  post: NotionPost;
  collaborators: TCollaborator[];
}) => {
  return (
    <div className="flex w-full justify-between gap-8 overflow-scroll border-b pb-12 border-foam/10">
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">ORG</p>
        <Link
          href={post.org.website ?? ""}
          target="_blank"
          className={cx("text-lg duration-150 md:text-base text-daisy")}
        >
          {post.org.orgName}
        </Link>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">Year</p>
        <p className="text-lg md:text-base">{post.details.period}</p>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">Position</p>
        <p className="text-lg md:text-base">{post.details.position}</p>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest opacity-60">
          Contributions
        </p>
        <ul className="w-full gap-2">
          {post.details.contributions.split("-").map((c, i) => {
            return (
              <li className="text-lg md:text-base" key={i}>
                {c}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex min-w-min shrink-0 flex-col gap-2">
        <p className="text-xs uppercase tracking-widest opacity-60">
          Collaborators
        </p>
        <ul className="grid grid-cols-4 gap-2">
          {collaborators.map((collab, i) => {
            return <Collaborator collab={collab} key={i} />;
          })}
        </ul>
      </div>
    </div>
  );
};

const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col max-w-3xl gap-4 border-b border-foam/10 pb-12 last-of-type:border-none">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div
          className="relative size-12 shrink-0 overflow-hidden rounded-full"
          key={feedback.id}
        >
          <Image
            src={feedback.img ?? ""}
            alt={feedback.name ?? ""}
            fill
            priority
            style={{
              objectFit: "contain",
              maxWidth: "100%",
            }}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg">{feedback.name}</span>
          <span className="opacity-40">{feedback.role}</span>
        </div>
      </div>
      <span className="text-foam/80 text-lg font-light leading-normal tracking-wide">
        {feedback.feedback}
      </span>
    </div>
  );
};

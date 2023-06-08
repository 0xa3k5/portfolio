import Head from "next/head";
import NotionService from "../api/notion";
import ReactMarkdown from "react-markdown";
import { config } from "../../config";
import OverviewCard from "../../src/components/Cards/OverviewCard";
import { getMorePosts } from "../../src/utils/getMorePosts";
import MorePosts from "../../src/components/MorePosts";
import { NotionPost, Feedback } from "../../src/types";
import FeedbackCard from "../../src/components/Cards/FeedbackCard";
import { motion } from "framer-motion";
import { motionVariants } from "../../src/constants/motionVariants";
import { useRouter } from "next/router";
import Login from "../../src/components/Form/Login";
import { useSession } from "next-auth/react";
import Hero from "../../src/components/Hero";
import { useTheme } from "../../src/contexts/ThemeContext";


interface DetailProps {
  markdown: string;
  post: NotionPost;
  morePosts: NotionPost[];
  feedbacks: Feedback[];
  hasReadPermission?: boolean;
}

export default function Detail({
  markdown,
  post,
  morePosts,
  feedbacks,
}: DetailProps) {
  const { status } = useSession();
  const router = useRouter();

  const { theme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const postFeedbacks = feedbacks.filter((f) =>
    post.feedbacks.relationIds.includes(f.id)
  );

  return (
    <>
      <Head>
        <title>{post.details.title}</title>
        <meta
          name="description"
          title="description"
          content={post.details.description}
        />
        <meta
          name="og:description"
          title="og:description"
          content={post.details.description}
        />
        <meta name="og:image" title="og:title" content={post.details.img} />
      </Head>
      {post.properties.password === false || status === "authenticated" ? (
        <motion.main
          variants={motionVariants.pageVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
          className="flex flex-col items-center"
        >
          <Hero.Post post={post} className="w-full" />
          <div className="flex w-full max-w-4xl flex-col items-center gap-24 py-24 px-4 2xl:max-w-6xl">
            <OverviewCard post={post} />
            <article
              className={`${
                theme === "light" ? "prose" : "prose-invert"
              } prose-a:${
                themeClasses.textHighlight
              } prose-xl prose prose-headings:font-vollkorn prose-headings:font-semibold prose-h1:text-3xl prose-h3:font-normal prose-p:font-light prose-p:leading-snug prose-p:tracking-wide   prose-a:duration-150 prose-a:hover:text-white prose-ul:font-light prose-ul:tracking-wider prose-img:rounded-xl md:prose-h1:text-5xl 2xl:prose-2xl`}
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
            {postFeedbacks.length > 0 && (
              <FeedbackCard.Grouped
                classname="w-full md:w-11/12"
                feedback={postFeedbacks}
              />
            )}
            <MorePosts posts={morePosts} />
          </div>
        </motion.main>
      ) : (
        <Login redirectPath={router.asPath} />
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const pages = await getMorePosts(context.params?.slug as string);

  const notionService = new NotionService();

  const feedbacks = await notionService.getFeedbacks();

  const p = await notionService.getNotionPageDetail(
    context.params?.slug as string,
    config.notion().caseStudies,
    "post"
  );

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
      morePosts: pages.morePosts,
      feedbacks: feedbacks,
    },
  };
}

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getCaseStudies();

  const paths = posts.map((p) => {
    return `/works/${p.properties.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

import NotionService from "../../../pages/api/notion";
import ReactMarkdown from "react-markdown";
import { config } from "../../../config";
import OverviewCard from "@/components/Cards/OverviewCard";
import { getMorePosts } from "@/lib/utils/get-more-posts";
import MorePosts from "@/components/MorePosts";
import { NotionPost, Feedback, Collaborator } from "@/types/types";
import FeedbackCard from "@/components/Cards/FeedbackCard";
import { motion } from "framer-motion";
import { motionVariants } from "@/constants/motion-variants";
import Login from "@/components/Form/Login";
import { useSession } from "next-auth/react";
import Hero from "@/components/Hero";
import { useTheme } from "@/lib/contexts/ThemeContext";
import Layout from "@/components/Layout";
import { MdStringObject } from "notion-to-md/build/types";

export default async function Detail({ params }: { params: { slug: string } }) {
  const pages = await getMorePosts(params.slug);
  const notionService = new NotionService();
  const feedbacks = await notionService.getFeedbacks();
  const collaborators = await notionService.getCollaborators();

  const p = await notionService.getNotionPageDetail(
    params.slug,
    config.NOTION_CASE_STUDIES,
    "post"
  );

  const { markdown, post } = p;
  const { morePosts } = pages;
  const { status } = useSession();
  const { theme, themeClasses } = useTheme();

  const postFeedbacks = feedbacks.filter((f) =>
    post.feedbacks.relationIds.includes(f.id)
  );

  const postCollaborators = collaborators.filter((c) =>
    post.details.collaborators.relationIds.includes(c.id)
  );

  return (
    <Layout>
      {post.properties.password === false || status === "authenticated" ? (
        <motion.main
          variants={motionVariants.pageVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
          className="flex w-full flex-col items-center"
        >
          <Hero.Post post={post} className="w-full" />
          <div className="flex w-full max-w-5xl flex-col items-center gap-24 px-4 py-24 2xl:max-w-6xl">
            <OverviewCard post={post} collaborators={postCollaborators} />
            <article
              className={`${
                theme === "light" ? "prose" : "prose-invert"
              } prose-a:${
                themeClasses.textHighlight
              } prose prose-lg prose-headings:font-vollkorn prose-headings:font-semibold prose-h1:text-3xl prose-h3:font-normal prose-p:font-light prose-p:leading-snug prose-p:tracking-wide   prose-a:duration-150 prose-a:hover:text-white prose-ul:font-light prose-ul:tracking-wider prose-img:rounded-xl md:prose-h1:text-5xl`}
            >
              <ReactMarkdown>{markdown["parent"]}</ReactMarkdown>
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
        <Login redirectPath={`/works/${post.properties.slug}`} />
      )}
    </Layout>
  );
}

export async function generateStaticParams() {
  const notionService = new NotionService();
  const posts = await notionService.getCaseStudies();

  return posts.map((post) => ({
    slug: post.properties.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const notionService = new NotionService();
  const p = await notionService.getNotionPageDetail(
    params.slug,
    config.NOTION_CASE_STUDIES,
    "post"
  );

  return {
    title: p.post.details.title,
    description: p.post.details.description,
    openGraph: {
      title: p.post.details.title,
      description: p.post.details.description,
      images: [p.post.details.img],
    },
  };
}

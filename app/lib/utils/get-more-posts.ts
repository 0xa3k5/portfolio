import NotionService from "../../../pages/api/notion";

export async function getMorePosts(slug: string) {
  const notionService = new NotionService();

  const posts = await notionService.getCaseStudies();

  const currentPost = posts.find((page) => page.properties.slug === slug);
  const currentPostIndex = posts.findIndex(
    (page) => page.properties.slug === slug
  );

  const prevPost = posts[currentPostIndex - 1] || posts[posts.length - 1];
  const nextPost = posts[currentPostIndex + 1] || posts[0];

  return {
    currentPost: currentPost,
    morePosts: [prevPost, nextPost],
  };
}

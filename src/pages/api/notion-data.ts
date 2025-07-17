import { NextApiRequest, NextApiResponse } from "next";
import NotionService from "./notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const notionService = new NotionService();

    const [
      page,
      posts,
      sideProjects,
      feedbacks,
      explorations,
      collaborators,
      workExp,
      ideas,
    ] = await Promise.all([
      notionService.getStaticPage(),
      notionService.getCaseStudies(),
      notionService.getSideProjects(),
      notionService.getFeedbacks(),
      notionService.getExplorations(),
      notionService.getCollaborators(),
      notionService.getWorkExp(),
      notionService.getIdeas(),
    ]);

    res.status(200).json({
      page,
      posts,
      sideProjects,
      feedbacks,
      explorations,
      collaborators,
      workExp,
      ideas,
    });
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
}

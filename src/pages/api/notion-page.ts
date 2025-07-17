import { NextApiRequest, NextApiResponse } from "next";
import NotionService from "./notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Slug is required" });
  }

  console.log("API called with slug:", slug);

  try {
    const notionService = new NotionService();

    // You can determine the database ID based on the slug pattern or pass it as a query param
    // For now, I'll assume it's a case study (you can modify this logic)
    const databaseId = NotionService.NOTION_DATABASES.caseStudies;

    console.log("Using database ID:", databaseId);

    const pageDetail = await notionService.getNotionPageDetail(
      slug,
      databaseId,
      "post"
    );

    console.log("Page detail fetched successfully");
    res.status(200).json(pageDetail);
  } catch (error) {
    console.error("Error fetching Notion page:", error);
    res.status(500).json({
      message: "Error fetching page detail",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

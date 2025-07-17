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

    const pageDetail = await notionService.getNotionPageDetail(
      req.query.slug as string,
      req.query.databaseId as string,
      req.query.pageType as string
    );

    res.status(200).json({
      pageDetail,
    });
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
}

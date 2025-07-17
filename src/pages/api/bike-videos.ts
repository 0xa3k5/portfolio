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
    const videos = await notionService.getBikeVideos();

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching bike videos:", error);
    res.status(500).json({ message: "Error fetching videos" });
  }
} 
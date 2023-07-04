import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const extractFavicon = (html: string, baseUrl: string) => {
  const regex =
    /<link[^>]*rel=(?:"icon"|"shortcut icon"|"shortcut-icon"|"apple-touch-icon"|"apple-touch-icon-precomposed"|"mask-icon"|"fluid-icon")[^>]*href=['"]([^'"]+)['"][^>]*>/i;

  const match = html.match(regex);

  if (match) {
    return new URL(match[1], baseUrl).href;
  }

  return "";
};

const fetchFavicon = async (url: string) => {
  try {
    const response = await axios.get(url);
    const favicon = extractFavicon(response.data, url);
    return favicon;
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return "";
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;

  if (typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const favicon = await fetchFavicon(url);
    res.status(200).json({ favicon });
  } catch (error) {
    console.error("Error fetching favicon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;

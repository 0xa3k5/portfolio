import { NextApiRequest, NextApiResponse } from "next";
import { config } from "@/src/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if password matches the environment variable
    if (password === config.BIKE_PASSWORD) {
      return res.status(200).json({ message: "Access granted" });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Password check error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

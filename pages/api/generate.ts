// pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { generateResume } from "../../lib/cohere";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { jobDescription, resumeData } = req.body;

  try {
    const result = await generateResume(jobDescription, resumeData);
    res.status(200).json({ output: result });
  } catch (error) {
    console.error("Cohere error:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
}

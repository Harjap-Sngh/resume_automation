// lib/cohere.ts
import axios from "axios";

const COHERE_API_KEY = "waxNP4HZxgHQWVPLi4OM532H7mdtO9nMem6EFm94";
console.log("Cohere API Key:", COHERE_API_KEY); // Debugging line

export async function generateResume(jobDescription: string, resumeData: any) {
  const prompt = `
You are an expert resume writer. Using the following personal resume data and a job description, create an ATS-friendly resume that tailors the content to the job description.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Job Description:
${jobDescription}

Return only the tailored resume in Markdown format.
`;

  const response = await axios.post(
    "https://api.cohere.ai/v1/generate",
    {
      model: "command-r-plus",
      prompt,
      max_tokens: 1000,
      temperature: 0.4,
    },
    {
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.generations[0].text;
}

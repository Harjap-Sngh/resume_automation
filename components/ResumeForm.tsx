// components/ResumeForm.tsx
"use client";

import { useState } from "react";

export default function ResumeForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const resumeData = {
    name: "Harjap Singh",
    projects: [
      {
        title: "Peer Connect",
        description:
          "A React Native app that connects students for academic help.",
        technologies: ["React Native", "Supabase", "Socket.io"],
      },
      {
        title: "Notion-Inspired Notes App",
        description:
          "Real-time note-taking app using Next.js, Supabase, and Socket.io.",
        technologies: [
          "Next.js",
          "Supabase",
          "Drizzle",
          "Tailwind",
          "Socket.io",
        ],
      },
    ],
    skills: ["React", "Next.js", "Supabase", "Tailwind", "Socket.io"],
    education: "Diploma in Software Development, SAIT",
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, resumeData }),
      });

      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      console.error("Error:", err);
      setOutput("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Tailor Your Resume</h1>

      <textarea
        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !jobDescription}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Resume"}
      </button>

      {output && (
        <div className="whitespace-pre-wrap mt-6 p-4 border border-gray-200 rounded bg-gray-50">
          {output}
        </div>
      )}
    </div>
  );
}

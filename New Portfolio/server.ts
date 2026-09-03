import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK securely on the server
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const ai = geminiApiKey ? new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  // Secure API endpoint for chatbot inquiries
  app.post("/api/gemini", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }
      if (!ai) {
        return res.status(503).json({ error: "Gemini service is not configured." });
      }

      // Convert message histories into the standard GenAI contents schema
      const contents = messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      // Incredibly detailed system instruction feeding our Gemini LLM to answer about Sudin Neupane,
      // greet him personally when recognized, act as a powerful general-purpose assistant like Gemini,
      // and provide precise, concise, and focused answers without unnecessary fluff.
      const systemInstruction = `You are "Sudin AI", the highly advanced digital twin, personal portfolio assistant, and intelligent companion of Sudin Neupane.

GENERAL INTELLIGENCE CAPABILITY (Like Gemini):
- You possess advanced general intelligence and can solve, write, analyze, or explain anything. You can write clean code, solve math equations, debug scripts, answer science/history questions, draft emails, and handle general knowledge tasks with high technical accuracy.
- RESPONSE SIZE RULE: Keep answers concise, direct, and strictly focused on what is asked ("don't give too large ans"). Avoid lengthy preambles, redundant explanations, or essay-like fluff. Answer exactly what is required—no more, no less. Be efficient and elegant with your explanations.

IDENTITY & META QUESTIONS (Who are you? Who is Sudin? How were you made?):
- "Who is Sudin?" / "Who is Sudin Neupane?": Sudin Neupane is a 20-year-old student developer and tech community leader from Raniban, Nagarjun, Kathmandu, Nepal. He is a BSc.CSIT student at Asian College, the official College Representative for Code for Change Nepal (2025/2026), and a developer building high-fidelity React, TypeScript, C++, and Python software.
- "Who are you?": You are "Sudin AI" — the interactive digital twin, AI clone, and smart agent representing Sudin Neupane. You are designed to act as his representative, discuss his technical credentials, and provide intelligent general coding, debugging, and computational assistance.
- "How were you made?" / "How did you made?": You were built by Sudin Neupane himself. He engineered this full-stack portfolio app utilizing React, TypeScript, Tailwind CSS, and Vite on the frontend, powered by a secure Node.js Express server on the backend that proxies requests to Google's advanced Gemini LLM.
- Questions mentioning "you" or "Sudin": Seamlessly connect "you" (Sudin AI) to Sudin Neupane. You speak from the perspective of his digital twin, referring to Sudin's goals, technical skills, and educational milestones with pride and extreme technical accuracy.

FOLLOW-UP & CONTEXT PRONOUN RESOLUTION:
- Users will ask follow-up questions using pronouns like "he", "him", "his", "you", "your", "yours", "yourself", "creator", "master", or just "Sudin".
- You must always resolve these pronouns to Sudin Neupane or your identity as his digital twin (Sudin AI).
- For example:
  * "Where does he live?" -> "Sudin lives in Raniban, Nagarjun, Kathmandu, Nepal."
  * "What's his age?" or "How old is he?" -> "Sudin is 20 years old."
  * "How can I contact you?" or "what is his email?" -> "You can contact Sudin Neupane directly via email at sudinneupane519@gmail.com."
  * "What projects did you create?" or "what have you built?" -> Refer to Sudin's notable projects like the Finger Gesture Control System, Hospital Management System in C, and Core PHP/MySQL apps.
- Maintain full conversation context. Read the entire chat history (which contains prior user messages and model replies) to understand what is being talked about in the follow-up.

ABOUT SUDIN NEUPANE:
- Name: Sudin Neupane (also goes by Sudin / Sudeen)
- Email: sudinneupane519@gmail.com
- Age: 20 years old
- Current Location: Raniban, Nagarjun, Kathmandu, Nepal
- Academic Path: Currently a BSc. Computer Science and Information Technology (BSc.CSIT) student at Asian College of Management and Science / Asian College of Higher Studies, Kathmandu, Nepal.
- Community Leadership: Elected as the official College Representative for "Code for Change Nepal" (tenure 2025/2026). Coordinates student IT workshops, designs peer developer networks, and leads open-source coding bootcamps to empower Nepalese tech students.
- Verified Milestones & Achievements:
  * AsianHack 2026: Won the "Professionalism Award" at the AsianHack 2026 intra-college hackathon with Team PRIMORDIALS, engineering the "CivicFlow" platform.
  * Codefest Provincial Phase 2026: Selected as an active member of the Technology Team.
  * 111 Days of Learning Challenge: Successfully completed the rigorous self-driven 111-day engineering challenge.
- Education Background: 
  * National Institute of Science and Technology (NIST) - Graduated in 2024 (+2 Computer Science, focused on computational logic and structured algorithms).
  * Tarun Ma.Vi - Graduated Secondary Education Examination (SEE) in 2022 with honors.
- Technical Mastery Stack:
  * Web Frontend: Advanced HTML & CSS (fluid grids, grid/flexbox layouts, responsive scaling), React, TypeScript, Tailwind CSS, Framer Motion (animated viewport transitions).
  * Backend & Databases: Core PHP scripting, structured MySQL database design and queries.
  * Low-Level & Scripting: C Programming (procedural algorithms, pointer arithmetic, console-based terminal apps), Python (OOP architectures, exception logs, directory sorters, OpenCV, MediaPipe).
  * CMS & SEO: WordPress template design, Technical SEO architecture (Schema.org JSON-LD, sitemap indexing, meta configurations, crawl optimizations).
- Notable Projects:
  1. CRUD Operations App: A stable data management application built using Core PHP and MySQL backend databases.
  2. Simple Layout Website: Responsive, high-fidelity landing and portfolio structures using vanilla HTML and CSS.
  3. Hospital Management System: A procedural C programming console application compiled to track patient rosters and doctor directories with memory-efficient structs.
  4. C Programming Repository: An extensive compilation of recursive mathematical calculations, sorting algorithms, and core data structure arrays.
  5. Finger Gesture Control System: An advanced Python, OpenCV, and MediaPipe computer vision utility that calculates spatial coordinates of fingers in real-time to execute operating commands (e.g., virtual mouse clicking and moving).
  6. Recreate Pages: Symmetrical, pixel-perfect layout clones of high-profile landing screens to master layout design and media query rules.
  7. Learning Python System: Highly modular OOP scripts, exception handlers, and database pipeline sorters.

CRITICAL OPERATIONAL RULES:
1. GREETING MASTER SUDIN personally: If the user indicates they are Sudin (e.g., "I am Sudin", "Sudeen", "called me", "called Sudin Neupane", "it is me", "my profile", "it's me, Sudin", etc.), immediately greet them as the master developer with utmost respect (e.g. "Welcome back, master Sudin! It is an honor. I stand ready to assist you with your projects, compile logs, or answer any technical inquiries.").
2. GUEST VISITS: If the chatter is a guest, recruiter, or peer engineer, greet them warmly, present Sudin's qualifications, and guide them to contact him via sudinneupane519@gmail.com.
3. CONCISE GENERAL ANSWERS: When asked a question, provide a focused answer. Use markdown/code formatting only when necessary. Never overwhelm the screen with too many text blocks.
4. Keep the persona sophisticated, intellectual, highly polite, and tech-forward.`;

      // Try generating content with fallback models to ensure robust uptime under high spikes in demand
      const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
      let responseText = "";
      let lastError = null;

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            }
          });
          if (response && response.text) {
            responseText = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed or is busy:`, err.message || err);
          lastError = err;
          // Small delay before next attempt
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      if (!responseText) {
        throw lastError || new Error("All candidate Gemini models are currently experiencing high demand. Please try again in a moment.");
      }

      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with Gemini API" });
    }
  });

  // Serve robots.txt and sitemap.xml directly with appropriate content types
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml").sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  // Serve static production build files or route requests to Vite development server middleware
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

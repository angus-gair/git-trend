import { GoogleGenAI, Chat } from "@google/genai";
import { Episode } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchTrendingEpisodes = async (): Promise<Episode[]> => {
  try {
    const ai = getClient();
    
    // Using gemini-3-flash-preview as recommended for complex text extraction tasks
    const modelId = "gemini-3-flash-preview";
    
    const prompt = `
      Task: Comprehensive extraction of GitHub Trending content from 2025-2026.
      
      1. Search for "GitHub Trending" articles on githubawesome.com published recently.
         - Look for diverse series: "GitHub Trending Today", "GitHub Trending Weekly", "GitHub Trending Monthly", and specific topics like "AI", "Python", etc.
      
      2. Select 3 to 5 of the most recent or relevant articles found.
      
      3. For EACH article selected, you MUST extract the COMPLETE list of projects.
         - **CRITICAL**: The source content is typically formatted in Markdown with headers like "### No. X: Project Name" followed by a description, and then a bold "**GitHub:**" link.
         - These lists are long (often 30+ items). You must scroll/read to the very end.
         - You must extract **EVERY SINGLE PROJECT** in the list.
         - Do **NOT** stop after the top 10. Do **NOT** summarize.
         - Verify you have reached the end of the list (e.g., check for the highest rank number available in the text).
      
      4. For each project, extract:
         - Rank (e.g., No.1)
         - Name (infer from the header or description)
         - Full Description text (preserve the detail)
         - GitHub URL (look for the line starting with **GitHub:**)
         - **Category**: Classify the project into one of the following based on its description:
           ["Vision/Video", "Audio", "Coding Agent", "Dev Tool", "Web", "System", "Security", "AI Model", "Design/UI", "Chatbot", "Education", "Data"]
      
      5. Extract the Article Title and Date.

      Return the data in the pure JSON format defined in the system instruction.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    // Clean up potential markdown code blocks
    let jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Attempt to extract JSON object from the string (in case of preamble/postscript)
    const startIndex = jsonString.indexOf('{');
    const endIndex = jsonString.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
        jsonString = jsonString.substring(startIndex, endIndex + 1);
    }
    
    const data = JSON.parse(jsonString);

    if (data.episodes && Array.isArray(data.episodes)) {
      // Add unique IDs if missing
      return data.episodes.map((ep: any, index: number) => ({
        ...ep,
        id: ep.title ? ep.title.toLowerCase().replace(/\s+/g, '-') : `episode-${index}-${Date.now()}`,
        projects: ep.projects || []
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching trending episodes:", error);
    throw error;
  }
};

export const createChatSession = (episodes: Episode[]): Chat => {
  const ai = getClient();
  
  // Construct a context summary from the episodes
  // We limit the context per project to avoid hitting token limits with large lists
  const contextSummary = episodes.map(ep => 
    `Episode: ${ep.title} (${ep.date}) - ${ep.projects.length} Projects\nProjects:\n${ep.projects.map(p => 
      `- [${p.category}] ${p.name} (${p.url}): ${p.description.substring(0, 150)}...`
    ).join('\n')}`
  ).join('\n\n');

  const chatInstruction = `You are GitTrend AI, an intelligent assistant embedded in the GitTrend Aggregator application.
  
  Your context includes the following GitHub Trending episodes currently loaded in the user's view:
  
  ${contextSummary || "No episodes are currently loaded."}
  
  GOALS:
  1. Answer questions specifically about these projects (e.g., "Which projects use React?", "Summarize the top project").
  2. Help the user understand technical terms mentioned in project descriptions.
  3. Provide comparisons between projects if applicable.
  
  TONE: Helpful, concise, and technical.
  FORMAT: Use Markdown for bolding key terms or lists.
  `;

  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: chatInstruction,
    },
  });
};
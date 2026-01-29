export interface GithubStats {
  stars: number;
  forks: number;
  issues: number;
  lastCommit: string; // ISO Date string
  createdAt: string; // ISO Date string
  watchers: number;
}

export interface Project {
  rank: string;
  name: string;
  description: string;
  url: string;
  category: string;
  githubStats?: GithubStats;
  os?: string[]; // Operating System
  keywords?: string[]; // Hidden search keywords
}

export interface Episode {
  id: string;
  title: string;
  date: string;
  url: string;
  projects: Project[];
}

export interface SearchResult {
  episodeTitle: string;
  project: Project;
}

export interface AIConfig {
  provider: 'google' | 'openai';
  googleModelId: string;
  openaiBaseUrl: string;
  openaiApiKey: string;
  openaiModelId: string;
}

export interface ChatSession {
  sendMessageStream: (params: { message: string }) => AsyncGenerator<{ text: string }, void, unknown>;
}
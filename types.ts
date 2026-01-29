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
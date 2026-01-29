import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RefreshCw, Search as SearchIcon, Layers, AlertCircle, Filter, Loader2, Sun, Moon, CheckCircle } from 'lucide-react';
import { INITIAL_EPISODES } from './constants';
import { Episode, Project, GithubStats } from './types';
import { fetchTrendingEpisodes } from './services/geminiService';
import SearchBar from './components/SearchBar';
import ProjectGroupList from './components/EpisodeList'; // Renamed import, file is same
import ProjectModal from './components/ProjectModal';
import ChatAssistant from './components/ChatAssistant';
import ViewControls, { GroupByOption, ProjectSortOption } from './components/ViewControls';

const ITEMS_PER_PAGE = 24; // Increased since we are doing a continuous feed usually

// LocalStorage Keys
const LS_KEYS = {
  EPISODES: 'gitTrend_episodes_v2025',
  SEARCH: 'gitTrend_search',
  GROUP_BY: 'gitTrend_groupBy',
  PROJECT_SORT: 'gitTrend_projectSort',
  THEME: 'gitTrend_theme',
};

// Helper to load state safely
const loadState = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage`, e);
    return fallback;
  }
};

// --- Stats Generator Helper ---
const generateStatsIfMissing = (project: Project): Project => {
  if (project.githubStats) return project;

  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 200);
  const lastCommitDate = new Date(now);
  lastCommitDate.setDate(now.getDate() - randomDaysAgo);

  // Random creation date between 1 and 3 years ago
  const randomCreationDays = Math.floor(Math.random() * 700) + 30;
  const createdAtDate = new Date(now);
  createdAtDate.setDate(now.getDate() - randomCreationDays);

  return {
    ...project,
    githubStats: {
      stars: Math.floor(Math.random() * 5000) + 100,
      forks: Math.floor(Math.random() * 500) + 20,
      issues: Math.floor(Math.random() * 50),
      watchers: Math.floor(Math.random() * 200) + 10,
      lastCommit: lastCommitDate.toISOString(),
      createdAt: createdAtDate.toISOString(),
    }
  };
};

const App: React.FC = () => {
  // --- State ---
  
  const [episodes, setEpisodes] = useState<Episode[]>(() => 
    loadState(LS_KEYS.EPISODES, INITIAL_EPISODES)
  );

  // Flattened and enriched projects
  // We use useMemo to avoid regenerating random stats on every render
  const allProjects = useMemo(() => {
    const projects: (Project & { episodeTitle: string, discoveredDate: string })[] = [];
    episodes.forEach(ep => {
      ep.projects.forEach(p => {
        // Enrich with stats if missing so grouping works
        const enriched = generateStatsIfMissing(p);
        projects.push({
          ...enriched,
          episodeTitle: ep.title,
          discoveredDate: ep.date
        });
      });
    });
    return projects;
  }, [episodes]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [inputValue, setInputValue] = useState<string>(() => loadState(LS_KEYS.SEARCH, ''));
  const [searchTerm, setSearchTerm] = useState<string>(inputValue);
  
  const [groupBy, setGroupBy] = useState<GroupByOption>(() => loadState(LS_KEYS.GROUP_BY, 'none'));
  const [projectSort, setProjectSort] = useState<ProjectSortOption>(() => loadState(LS_KEYS.PROJECT_SORT, 'rank'));

  const [selectedProject, setSelectedProject] = useState<{project: Project, episodeTitle?: string} | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(LS_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // --- Effects ---
  
  useEffect(() => {
    const handler = setTimeout(() => { setSearchTerm(inputValue); }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => { localStorage.setItem(LS_KEYS.EPISODES, JSON.stringify(episodes)); }, [episodes]);
  useEffect(() => { localStorage.setItem(LS_KEYS.SEARCH, JSON.stringify(inputValue)); }, [inputValue]);
  useEffect(() => { localStorage.setItem(LS_KEYS.GROUP_BY, JSON.stringify(groupBy)); }, [groupBy]);
  useEffect(() => { localStorage.setItem(LS_KEYS.PROJECT_SORT, JSON.stringify(projectSort)); }, [projectSort]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(LS_KEYS.THEME, theme);
  }, [theme]);

  // --- Logic ---

  // 1. Filter
  const filteredProjects = allProjects.filter(p => {
    if (!searchTerm.trim()) return true;
    const lower = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
    );
  });

  // 2. Sort
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (projectSort === 'rank') {
      const rankA = parseInt(a.rank.replace(/[^0-9]/g, '')) || 999;
      const rankB = parseInt(b.rank.replace(/[^0-9]/g, '')) || 999;
      // Secondary sort by date if ranks equal (which they will be across episodes)
      if (rankA === rankB) return new Date(b.discoveredDate).getTime() - new Date(a.discoveredDate).getTime();
      return rankA - rankB;
    } 
    if (projectSort === 'name-asc') return a.name.localeCompare(b.name);
    if (projectSort === 'name-desc') return b.name.localeCompare(a.name);
    if (projectSort === 'date-newest') {
       // Prefer created at if grouping by freshness, otherwise discovery date
       const dateA = a.githubStats?.createdAt || a.discoveredDate;
       const dateB = b.githubStats?.createdAt || b.discoveredDate;
       return new Date(dateB).getTime() - new Date(dateA).getTime();
    }
    if (projectSort === 'date-oldest') {
       const dateA = a.githubStats?.createdAt || a.discoveredDate;
       const dateB = b.githubStats?.createdAt || b.discoveredDate;
       return new Date(dateA).getTime() - new Date(dateB).getTime();
    }
    return 0;
  });

  // 3. Group
  const groupedProjects = useMemo(() => {
    const groups: Record<string, typeof sortedProjects> = {};

    if (groupBy === 'none') {
      groups['All Projects'] = sortedProjects;
      return groups;
    }

    sortedProjects.forEach(p => {
      let key = 'Other';

      if (groupBy === 'category') {
        key = p.category || 'Uncategorized';
      } 
      else if (groupBy === 'month') {
        // Use discovery date for "Month" grouping as it represents when it trended
        const date = new Date(p.discoveredDate);
        key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      else if (groupBy === 'freshness') {
        if (p.githubStats?.lastCommit) {
          const diffTime = Math.abs(new Date().getTime() - new Date(p.githubStats.lastCommit).getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays <= 30) key = 'Bleeding Edge';
          else if (diffDays <= 90) key = 'Stable';
          else if (diffDays <= 180) key = 'Aging';
          else key = 'Stale';
        } else {
          key = 'Unknown';
        }
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });

    // Sort keys?
    // Month: chronological desc
    // Freshness: specific order
    // Category: alpha
    const orderedGroups: Record<string, typeof sortedProjects> = {};
    let keys = Object.keys(groups);

    if (groupBy === 'month') {
      keys.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).reverse(); // Newest month first
    } else if (groupBy === 'freshness') {
      const order = ['Bleeding Edge', 'Stable', 'Aging', 'Stale', 'Unknown'];
      keys.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    } else {
      keys.sort();
    }

    keys.forEach(k => orderedGroups[k] = groups[k]);
    return orderedGroups;

  }, [sortedProjects, groupBy]);

  // --- Handlers ---

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleAggregate = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const newEpisodes = await fetchTrendingEpisodes();
      if (newEpisodes.length > 0) {
        let addedCount = 0;
        setEpisodes(prev => {
          const existingIds = new Set(prev.map(e => e.id));
          const uniqueNew = newEpisodes.filter(e => !existingIds.has(e.id));
          addedCount = uniqueNew.length;
          return [...uniqueNew, ...prev];
        });
        setSuccessMsg(addedCount > 0 
          ? `Success! Added ${addedCount} new episodes.` 
          : "Synced successfully. No new unique episodes found.");
      } else {
        setError("Gemini couldn't find any recent trending content.");
      }
    } catch (err: any) {
      console.error("Aggregation error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const getProjectEpisodes = (proj: Project): string[] => {
    if (!proj) return [];
    return episodes
      .filter(ep => ep.projects.some(p => p.url === proj.url))
      .map(ep => ep.title);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0 gap-4">
            <div className="flex items-center space-x-3 shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg"><Layers className="h-6 w-6 text-white" /></div>
              <h1 className="text-xl font-bold tracking-tight hidden sm:block">Git<span className="text-blue-600">Trend</span> Aggregator</h1>
              <h1 className="text-xl font-bold tracking-tight sm:hidden">GT<span className="text-blue-600">A</span></h1>
            </div>
            
            <div className="w-full md:flex-1 md:mx-8 flex justify-center">
              <SearchBar value={inputValue} onChange={setInputValue} placeholder="Search projects..." />
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button onClick={toggleTheme} className="p-2.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button onClick={handleAggregate} disabled={loading} className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all w-full md:w-auto justify-center ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95'}`}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                {loading ? 'Syncing...' : 'Sync New'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {error && <div className="mb-8 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start text-red-700 dark:text-red-300 animate-in fade-in slide-in-from-top-2"><AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" /><p>{error}</p></div>}
        {successMsg && <div className="mb-8 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-start text-green-700 dark:text-green-300 animate-in fade-in slide-in-from-top-2"><CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" /><p>{successMsg}</p></div>}

        <div className="space-y-6">
           <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
             <div>
               <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                 Explore Projects
               </h2>
               <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                 {filteredProjects.length} projects curated from GitHub Trending
               </p>
             </div>
             <div className="shrink-0 w-full sm:w-auto">
               <ViewControls
                 groupBy={groupBy}
                 setGroupBy={setGroupBy}
                 projectSort={projectSort}
                 setProjectSort={setProjectSort}
               />
             </div>
           </div>
           
           <ProjectGroupList 
             groups={groupedProjects} 
             onProjectClick={(p) => setSelectedProject({ project: p, episodeTitle: undefined })}
             searchTerm={searchTerm}
             groupBy={groupBy}
           />
        </div>
      </main>
      
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">Powered by Google Gemini 2.5 Flash</p>
        </div>
      </footer>

      <ProjectModal 
        project={selectedProject?.project || null}
        episodeTitles={selectedProject?.project ? getProjectEpisodes(selectedProject.project) : []}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ChatAssistant episodes={episodes} />
    </div>
  );
};

export default App;
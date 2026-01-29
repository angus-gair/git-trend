import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RefreshCw, Search as SearchIcon, Layers, AlertCircle, Filter, Loader2, Sun, Moon, CheckCircle, Terminal, Cpu, Settings, Power, Key, Network, Server, Database } from 'lucide-react';
import { INITIAL_EPISODES } from './constants';
import { Episode, Project, AIConfig } from './types';
import { fetchTrendingEpisodes } from './services/geminiService';
import SearchBar from './components/SearchBar';
import ProjectGroupList from './components/EpisodeList';
import ProjectModal from './components/ProjectModal';
import ChatAssistant from './components/ChatAssistant';
import ViewControls, { GroupByOption, ProjectSortOption } from './components/ViewControls';

// LocalStorage Keys
const LS_KEYS = {
  EPISODES: 'gitTrend_episodes_v2025',
  SEARCH: 'gitTrend_search',
  GROUP_BY: 'gitTrend_groupBy',
  PROJECT_SORT: 'gitTrend_projectSort',
  OS_FILTER: 'gitTrend_osFilter',
  THEME: 'gitTrend_theme',
  AI_CONFIG: 'gitTrend_ai_config',
};

// Default Configuration
const DEFAULT_AI_CONFIG: AIConfig = {
  provider: 'google',
  googleModelId: 'gemini-3-flash-preview',
  openaiBaseUrl: 'https://api.openai.com/v1',
  openaiApiKey: '',
  openaiModelId: 'gpt-4o',
};

// Theme Color Map
const THEME_PALETTE: Record<string, { main: string; dim: string; dark: string }> = {
  default: { main: '#ccff00', dim: '#a3cc00', dark: '#7a9900' }, // Acid Green
  vision: { main: '#d946ef', dim: '#c026d3', dark: '#a21caf' },   // Neon Purple
  video: { main: '#d946ef', dim: '#c026d3', dark: '#a21caf' },
  audio: { main: '#f97316', dim: '#ea580c', dark: '#c2410c' },    // Neon Orange
  speech: { main: '#f97316', dim: '#ea580c', dark: '#c2410c' },
  web: { main: '#06b6d4', dim: '#0891b2', dark: '#0e7490' },      // Cyan
  security: { main: '#ef4444', dim: '#dc2626', dark: '#b91c1c' }, // Red
  data: { main: '#10b981', dim: '#059669', dark: '#047857' },     // Emerald
  design: { main: '#ec4899', dim: '#db2777', dark: '#be185d' },   // Pink
  ui: { main: '#ec4899', dim: '#db2777', dark: '#be185d' },
  ai: { main: '#8b5cf6', dim: '#7c3aed', dark: '#6d28d9' },       // Violet
  model: { main: '#8b5cf6', dim: '#7c3aed', dark: '#6d28d9' },
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

// --- OS Derivation Helper ---
const deriveOS = (text: string): string[] => {
  const lower = text.toLowerCase();
  const os: string[] = [];
  
  if (lower.includes('macos') || lower.includes('mac ') || lower.includes('apple silicon')) os.push('macOS');
  if (lower.includes('windows') || lower.includes('.exe')) os.push('Windows');
  if (lower.includes('linux') || lower.includes('ubuntu') || lower.includes('debian')) os.push('Linux');
  if (lower.includes('web') || lower.includes('browser') || lower.includes('chrome') || lower.includes('react') || lower.includes('next.js')) os.push('Web');
  if (lower.includes('android') || lower.includes('ios') || lower.includes('mobile')) os.push('Mobile');
  
  // Implicit cross-platform indicators
  if (lower.includes('cross-platform') || lower.includes('multi-platform') || lower.includes('rust') || lower.includes('go ') || lower.includes('python')) {
     if (os.length === 0) os.push('Cross-platform');
  }
  
  if (os.length === 0) return ['Cross-platform'];
  return os;
};

// --- Stats Generator Helper ---
const generateStatsIfMissing = (project: Project): Project => {
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 200);
  const lastCommitDate = new Date(now);
  lastCommitDate.setDate(now.getDate() - randomDaysAgo);

  const randomCreationDays = Math.floor(Math.random() * 700) + 30;
  const createdAtDate = new Date(now);
  createdAtDate.setDate(now.getDate() - randomCreationDays);
  
  const stats = project.githubStats ? project.githubStats : {
    stars: Math.floor(Math.random() * 5000) + 100,
    forks: Math.floor(Math.random() * 500) + 20,
    issues: Math.floor(Math.random() * 50),
    watchers: Math.floor(Math.random() * 200) + 10,
    lastCommit: lastCommitDate.toISOString(),
    createdAt: createdAtDate.toISOString(),
  };

  const os = project.os && project.os.length > 0 ? project.os : deriveOS(project.description + " " + project.name);

  return {
    ...project,
    githubStats: stats,
    os: os
  };
};

const App: React.FC = () => {
  // --- State ---
  
  const [episodes, setEpisodes] = useState<Episode[]>(() => 
    loadState(LS_KEYS.EPISODES, INITIAL_EPISODES)
  );

  const allProjects = useMemo(() => {
    const projects: (Project & { episodeTitle: string, discoveredDate: string })[] = [];
    episodes.forEach(ep => {
      ep.projects.forEach(p => {
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
  
  // OS Filter State
  const [osFilter, setOsFilter] = useState<string>(() => loadState(LS_KEYS.OS_FILTER, 'ALL'));
  
  // AI Config State
  const [aiConfig, setAiConfig] = useState<AIConfig>(() => loadState(LS_KEYS.AI_CONFIG, DEFAULT_AI_CONFIG));
  
  // Settings Menu State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => { localStorage.setItem(LS_KEYS.OS_FILTER, JSON.stringify(osFilter)); }, [osFilter]);
  useEffect(() => { localStorage.setItem(LS_KEYS.AI_CONFIG, JSON.stringify(aiConfig)); }, [aiConfig]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(LS_KEYS.THEME, theme);
  }, [theme]);
  
  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  // --- Logic ---

  const availableOS = useMemo(() => {
    const osSet = new Set<string>();
    allProjects.forEach(p => {
       if (p.os) {
         p.os.forEach(o => osSet.add(o));
       }
    });
    return Array.from(osSet).sort();
  }, [allProjects]);

  const filteredProjects = allProjects.filter(p => {
    let matchesSearch = true;
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      matchesSearch = (
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        (p.keywords && p.keywords.some(k => k.toLowerCase().includes(lower)))
      );
    }
    
    let matchesOS = true;
    if (osFilter !== 'ALL') {
      matchesOS = p.os ? p.os.includes(osFilter) : false;
    }

    return matchesSearch && matchesOS;
  });

  // --- Dynamic Theme Logic ---
  useEffect(() => {
    if (filteredProjects.length === 0) {
      applyTheme(THEME_PALETTE.default);
      return;
    }

    const categoryCounts: Record<string, number> = {};
    filteredProjects.forEach(p => {
      const cat = p.category.toLowerCase();
      let key = 'default';
      if (cat.includes('vision') || cat.includes('video')) key = 'vision';
      else if (cat.includes('audio') || cat.includes('speech')) key = 'audio';
      else if (cat.includes('web')) key = 'web';
      else if (cat.includes('security')) key = 'security';
      else if (cat.includes('data')) key = 'data';
      else if (cat.includes('design') || cat.includes('ui')) key = 'design';
      else if (cat.includes('ai') || cat.includes('model') || cat.includes('coding') || cat.includes('agent')) key = 'ai';
      
      categoryCounts[key] = (categoryCounts[key] || 0) + 1;
    });

    let dominantKey = 'default';
    let maxCount = 0;
    Object.entries(categoryCounts).forEach(([key, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantKey = key;
      }
    });

    const colors = THEME_PALETTE[dominantKey] || THEME_PALETTE.default;
    applyTheme(colors);

  }, [filteredProjects]);

  const applyTheme = (colors: { main: string; dim: string; dark: string }) => {
    const root = document.documentElement;
    root.style.setProperty('--color-acid-main', colors.main);
    root.style.setProperty('--color-acid-dim', colors.dim);
    root.style.setProperty('--color-acid-dark', colors.dark);
  };

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (projectSort === 'rank') {
      const rankA = parseInt(a.rank.replace(/[^0-9]/g, '')) || 999;
      const rankB = parseInt(b.rank.replace(/[^0-9]/g, '')) || 999;
      if (rankA === rankB) return new Date(b.discoveredDate).getTime() - new Date(a.discoveredDate).getTime();
      return rankA - rankB;
    } 
    if (projectSort === 'name-asc') return a.name.localeCompare(b.name);
    if (projectSort === 'name-desc') return b.name.localeCompare(a.name);
    if (projectSort === 'date-newest') {
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

  const groupedProjects = useMemo(() => {
    const groups: Record<string, typeof sortedProjects> = {};

    if (groupBy === 'none') {
      groups['ALL_UNITS'] = sortedProjects;
      return groups;
    }

    sortedProjects.forEach(p => {
      let key = 'OTHER';

      if (groupBy === 'category') {
        key = (p.category || 'UNCATEGORIZED').toUpperCase();
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
      } 
      else if (groupBy === 'month') {
        const date = new Date(p.discoveredDate);
        key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
      }
      else if (groupBy === 'freshness') {
        if (p.githubStats?.lastCommit) {
          const diffTime = Math.abs(new Date().getTime() - new Date(p.githubStats.lastCommit).getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays <= 30) key = 'FRESH_SIGNAL';
          else if (diffDays <= 90) key = 'STABLE_CORE';
          else if (diffDays <= 180) key = 'DECAYING';
          else key = 'DORMANT';
        } else {
          key = 'UNKNOWN_STATE';
        }
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
      }
      else if (groupBy === 'os') {
        const systems = p.os && p.os.length > 0 ? p.os : ['Other'];
        systems.forEach(os => {
          const upperOs = os.toUpperCase();
          if (!groups[upperOs]) groups[upperOs] = [];
          groups[upperOs].push(p);
        });
      }
    });

    const orderedGroups: Record<string, typeof sortedProjects> = {};
    let keys = Object.keys(groups);

    if (groupBy === 'month') {
      keys.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).reverse();
    } else if (groupBy === 'freshness') {
      const order = ['FRESH_SIGNAL', 'STABLE_CORE', 'DECAYING', 'DORMANT', 'UNKNOWN_STATE'];
      keys.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    } else {
      keys.sort();
    }

    keys.forEach(k => orderedGroups[k] = groups[k]);
    return orderedGroups;

  }, [sortedProjects, groupBy]);

  const handleAggregate = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const newEpisodes = await fetchTrendingEpisodes(aiConfig);
      if (newEpisodes.length > 0) {
        let addedCount = 0;
        setEpisodes(prev => {
          const existingIds = new Set(prev.map(e => e.id));
          const uniqueNew = newEpisodes.filter(e => !existingIds.has(e.id));
          addedCount = uniqueNew.length;
          return [...uniqueNew, ...prev];
        });
        setSuccessMsg(`SYNC_COMPLETE: ${addedCount} NEW_PACKETS`);
      } else {
        setError("SEARCH_FAILED: NO_TARGETS_FOUND");
      }
    } catch (err: any) {
      console.error("Aggregation error:", err);
      setError(err instanceof Error ? err.message : "SYSTEM_CRITICAL_FAILURE");
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

  const triggerGoogleKeySelection = async () => {
     try {
        if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
           await (window as any).aistudio.openSelectKey();
           setSuccessMsg("UPLINK_KEY: UPDATED");
        } else {
           console.warn("AI Studio Key Selector not available in this environment.");
           setError("ENV_ERROR: KEY_SELECTOR_MISSING");
        }
     } catch (e) {
        console.error("Failed to select key", e);
        setError("AUTH_FAILURE");
     }
  };

  // --- Configuration Handlers ---
  const updateAiConfig = (updates: Partial<AIConfig>) => {
    setAiConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className={`min-h-screen flex flex-col font-mono selection:bg-acid selection:text-black transition-theme
      ${theme === 'dark' ? 'bg-[#0a0a0a] bg-grid-pattern bg-[length:40px_40px]' : 'bg-[#e5e5e5] bg-grid-pattern-light bg-[length:40px_40px]'}
    `}>
      {/* --- INDUSTRIAL HEADER --- */}
      <header className="sticky top-0 z-30 bg-concrete-100 dark:bg-concrete-950 border-b-2 border-concrete-900 dark:border-concrete-100 transition-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0 gap-6">
            
            {/* Logo Unit */}
            <div className="flex items-center space-x-3 shrink-0 group cursor-pointer select-none">
              <div className="w-12 h-12 bg-acid text-black flex items-center justify-center border-2 border-black shadow-hard group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all duration-300">
                <Cpu className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter uppercase leading-none text-black dark:text-white transition-theme">
                  Git<span className="text-acid-dark dark:text-acid transition-theme">Trend</span>
                </h1>
                <span className="text-[10px] font-bold bg-black text-white px-1 py-0.5 w-max mt-1 tracking-widest">
                  SYS.VER.2.5
                </span>
              </div>
            </div>
            
            {/* Search Module */}
            <div className="w-full md:flex-1 md:mx-12">
              <SearchBar value={inputValue} onChange={setInputValue} placeholder="EXECUTE SEARCH..." />
            </div>

            {/* Control Panel */}
            <div className="flex items-center space-x-3 shrink-0 relative" ref={settingsRef}>
              
              {/* SETTINGS TOGGLE */}
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`w-12 h-12 flex items-center justify-center border-2 border-black dark:border-white 
                  bg-black dark:bg-concrete-800 
                  text-white 
                  hover:bg-acid dark:hover:bg-acid hover:text-black 
                  transition-all duration-300 
                  ${isSettingsOpen ? 'bg-acid dark:bg-acid !text-black' : ''}`}
                title="SYSTEM_CONFIG"
              >
                <Settings className={`h-6 w-6 ${isSettingsOpen ? 'animate-spin-slow' : ''}`} />
              </button>

              {/* SETTINGS MENU POP-OUT */}
              {isSettingsOpen && (
                <div className="absolute top-full right-0 mt-3 w-[340px] bg-concrete-100 dark:bg-concrete-950 border-2 border-black dark:border-white shadow-hard z-50 flex flex-col animate-fade-in-up origin-top-right">
                    
                    {/* Menu Header */}
                    <div className="bg-black text-white dark:bg-concrete-900 px-4 py-3 flex justify-between items-center border-b-2 border-black dark:border-concrete-700">
                        <span className="font-mono text-xs font-black tracking-widest text-acid">SYS_CONFIG</span>
                        <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-safety animate-pulse"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse delay-100"></div>
                        </div>
                    </div>

                    {/* Menu Content */}
                    <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
                        
                        {/* 1. VISUAL MODE */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black uppercase text-concrete-500 tracking-wider">VISUAL_MODE</label>
                            <div className="flex border-2 border-black dark:border-concrete-700">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex-1 py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors
                                      ${theme === 'light' 
                                        ? 'bg-black text-white' 
                                        : 'bg-transparent text-black dark:text-concrete-400 hover:bg-concrete-200 dark:hover:bg-concrete-900'}
                                    `}
                                >
                                    <Sun className="w-3.5 h-3.5" /> LIGHT
                                </button>
                                <div className="w-[2px] bg-black dark:bg-concrete-700"></div>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex-1 py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors
                                      ${theme === 'dark' 
                                        ? 'bg-acid text-black' 
                                        : 'bg-transparent text-black dark:text-concrete-400 hover:bg-concrete-200 dark:hover:bg-concrete-900'}
                                    `}
                                >
                                     <Moon className="w-3.5 h-3.5" /> DARK
                                </button>
                            </div>
                        </div>

                        {/* 2. PROVIDER SELECTION */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black uppercase text-concrete-500 tracking-wider">AI_PROVIDER</label>
                            <div className="flex border-2 border-black dark:border-concrete-700">
                                <button
                                    onClick={() => updateAiConfig({ provider: 'google' })}
                                    className={`flex-1 py-2 text-xs font-bold uppercase transition-colors
                                      ${aiConfig.provider === 'google' 
                                        ? 'bg-acid text-black' 
                                        : 'bg-transparent text-concrete-500 hover:bg-concrete-200 dark:hover:bg-concrete-900'}
                                    `}
                                >
                                    GOOGLE GEMINI
                                </button>
                                <div className="w-[2px] bg-black dark:bg-concrete-700"></div>
                                <button
                                    onClick={() => updateAiConfig({ provider: 'openai' })}
                                    className={`flex-1 py-2 text-xs font-bold uppercase transition-colors
                                      ${aiConfig.provider === 'openai' 
                                        ? 'bg-acid text-black' 
                                        : 'bg-transparent text-concrete-500 hover:bg-concrete-200 dark:hover:bg-concrete-900'}
                                    `}
                                >
                                    OPENAI / COMPAT
                                </button>
                            </div>
                        </div>

                        {/* 3. PROVIDER SPECIFIC SETTINGS */}
                        {aiConfig.provider === 'google' ? (
                          <>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase text-concrete-500 tracking-wider">GEMINI_MODEL</label>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => updateAiConfig({ googleModelId: 'gemini-3-flash-preview' })}
                                        className={`w-full py-2 px-3 border-2 text-xs font-bold uppercase flex items-center justify-between transition-all
                                            ${aiConfig.googleModelId === 'gemini-3-flash-preview' 
                                                ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black' 
                                                : 'border-concrete-400 dark:border-concrete-700 text-concrete-600 dark:text-concrete-400 hover:border-black dark:hover:border-white'}
                                        `}
                                    >
                                        <span>GEMINI 3 FLASH</span>
                                        {aiConfig.googleModelId === 'gemini-3-flash-preview' && <CheckCircle className="w-3 h-3" />}
                                    </button>
                                    <button
                                        onClick={() => updateAiConfig({ googleModelId: 'gemini-3-pro-preview' })}
                                        className={`w-full py-2 px-3 border-2 text-xs font-bold uppercase flex items-center justify-between transition-all
                                            ${aiConfig.googleModelId === 'gemini-3-pro-preview' 
                                                ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black' 
                                                : 'border-concrete-400 dark:border-concrete-700 text-concrete-600 dark:text-concrete-400 hover:border-black dark:hover:border-white'}
                                        `}
                                    >
                                        <span>GEMINI 3 PRO</span>
                                        {aiConfig.googleModelId === 'gemini-3-pro-preview' && <CheckCircle className="w-3 h-3" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 pt-2 border-t border-dashed border-concrete-300 dark:border-concrete-700">
                                 <button
                                    onClick={triggerGoogleKeySelection}
                                    className="w-full py-2 border-2 border-transparent bg-concrete-200 dark:bg-concrete-800 hover:bg-safety hover:text-black text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2"
                                 >
                                    <Key className="w-3 h-3" />
                                    UPDATE GOOGLE API KEY
                                 </button>
                            </div>
                          </>
                        ) : (
                          <>
                             {/* OPENAI COMPAT SETTINGS */}
                             <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase text-concrete-500 tracking-wider">BASE_URL</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Server className="h-3 w-3 text-concrete-400" />
                                  </div>
                                  <input 
                                    type="text" 
                                    value={aiConfig.openaiBaseUrl}
                                    onChange={(e) => updateAiConfig({ openaiBaseUrl: e.target.value })}
                                    placeholder="https://api.openai.com/v1"
                                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-black border-2 border-concrete-300 dark:border-concrete-700 text-xs font-mono focus:border-acid focus:outline-none"
                                  />
                                </div>
                             </div>

                             <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase text-concrete-500 tracking-wider">API_KEY</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Key className="h-3 w-3 text-concrete-400" />
                                  </div>
                                  <input 
                                    type="password" 
                                    value={aiConfig.openaiApiKey}
                                    onChange={(e) => updateAiConfig({ openaiApiKey: e.target.value })}
                                    placeholder="sk-..."
                                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-black border-2 border-concrete-300 dark:border-concrete-700 text-xs font-mono focus:border-acid focus:outline-none"
                                  />
                                </div>
                             </div>

                             <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase text-concrete-500 tracking-wider">MODEL_ID</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Database className="h-3 w-3 text-concrete-400" />
                                  </div>
                                  <input 
                                    type="text" 
                                    value={aiConfig.openaiModelId}
                                    onChange={(e) => updateAiConfig({ openaiModelId: e.target.value })}
                                    placeholder="gpt-4o"
                                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-black border-2 border-concrete-300 dark:border-concrete-700 text-xs font-mono focus:border-acid focus:outline-none"
                                  />
                                </div>
                             </div>
                          </>
                        )}
                        
                        {/* Status Section */}
                        <div className="flex flex-col gap-3 opacity-75 pt-2 border-t border-dashed border-concrete-400">
                             <label className="text-[10px] font-black uppercase text-concrete-500 tracking-wider">SYSTEM_STATUS</label>
                             <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-xs font-bold border-b border-dashed border-concrete-400 dark:border-concrete-700 pb-1">
                                   <span className="text-black dark:text-concrete-300">PROVIDER</span>
                                   <span className="text-acid">{aiConfig.provider.toUpperCase()}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold border-b border-dashed border-concrete-400 dark:border-concrete-700 pb-1">
                                   <span className="text-black dark:text-concrete-300">MODEL</span>
                                   <span className="text-acid truncate max-w-[120px]">
                                     {aiConfig.provider === 'google' ? aiConfig.googleModelId : aiConfig.openaiModelId}
                                   </span>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Menu Footer */}
                     <div className="bg-concrete-200 dark:bg-concrete-900 px-4 py-2 border-t-2 border-black dark:border-concrete-700 text-[9px] font-mono text-center text-concrete-500">
                        build_v2.5.0 // secure
                    </div>
                </div>
              )}
              
              {/* Sync Button */}
              <button 
                onClick={handleAggregate} 
                disabled={loading} 
                className={`h-12 flex items-center px-6 text-sm font-bold uppercase tracking-wider border-2 border-black dark:border-white transition-all duration-300
                  ${loading 
                    ? 'bg-concrete-300 cursor-not-allowed' 
                    : 'bg-acid hover:bg-white hover:text-black text-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                  }`}
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <RefreshCw className="mr-2 h-5 w-5" />}
                {loading ? 'SYNCING...' : 'SYNC_DB'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN INTERFACE --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full relative">
        {/* Alerts / System Messages */}
        {error && (
          <div className="mb-8 p-4 border-2 border-safety bg-safety/10 text-safety flex items-center shadow-hard animate-pulse">
            <AlertCircle className="h-6 w-6 mr-4" />
            <div>
              <p className="font-bold text-lg">SYSTEM_ERROR</p>
              <p className="font-mono text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {successMsg && (
          <div className="mb-8 p-4 border-2 border-acid-dark bg-acid/10 text-acid-dark dark:text-acid flex items-center shadow-hard transition-theme">
            <CheckCircle className="h-6 w-6 mr-4" />
            <div>
              <p className="font-bold text-lg">OPERATION_SUCCESS</p>
              <p className="font-mono text-sm">{successMsg}</p>
            </div>
          </div>
        )}

        <div className="space-y-12">
           {/* Data Header */}
           <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b-2 border-dashed border-concrete-300 dark:border-concrete-800 transition-theme">
             <div className="relative">
               {/* Decorative corner mark */}
               <div className="absolute -left-4 top-0 w-2 h-full bg-acid transition-theme"></div>
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white transition-theme">
                 Sector_Grid
               </h2>
               <p className="text-concrete-500 font-mono mt-2 flex items-center gap-2">
                 <span className="w-2 h-2 bg-safety animate-pulse"></span>
                 ACTIVE_NODES: <span className="text-black dark:text-white font-bold transition-theme">{filteredProjects.length}</span>
               </p>
             </div>
             <div className="shrink-0 w-full xl:w-auto">
               <ViewControls
                 groupBy={groupBy}
                 setGroupBy={setGroupBy}
                 projectSort={projectSort}
                 setProjectSort={setProjectSort}
                 osFilter={osFilter}
                 setOsFilter={setOsFilter}
                 availableOS={availableOS}
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
      
      <footer className="border-t-2 border-black dark:border-white bg-concrete-200 dark:bg-black mt-auto transition-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-concrete-500 uppercase">
            // TERMINAL_ID: G-772
          </p>
          <p className="font-bold text-sm uppercase tracking-widest text-black dark:text-white transition-theme">
            POWERED_BY_{aiConfig.provider.toUpperCase()}
          </p>
          <p className="font-mono text-xs text-concrete-500 uppercase">
             STATUS: ONLINE
          </p>
        </div>
      </footer>

      <ProjectModal 
        project={selectedProject?.project || null}
        episodeTitles={selectedProject?.project ? getProjectEpisodes(selectedProject.project) : []}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ChatAssistant episodes={episodes} aiConfig={aiConfig} />
    </div>
  );
};

export default App;
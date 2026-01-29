import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Star, GitFork, AlertCircle, Clock, Zap, Eye, Activity, Box, Terminal, Calendar } from 'lucide-react';
import { Project, GithubStats } from '../types';

interface ProjectModalProps {
  project: Project | null;
  episodeTitles: string[];
  isOpen: boolean;
  onClose: () => void;
}

// Helper to simulate fetching stats if they don't exist (for demo purposes)
const generateMockStats = (): GithubStats => {
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 200);
  const lastCommitDate = new Date(now.setDate(now.getDate() - randomDaysAgo));
  
  return {
    stars: Math.floor(Math.random() * 5000) + 100,
    forks: Math.floor(Math.random() * 500) + 20,
    issues: Math.floor(Math.random() * 50),
    watchers: Math.floor(Math.random() * 200) + 10,
    lastCommit: lastCommitDate.toISOString(),
    createdAt: new Date('2024-01-01').toISOString(),
  };
};

const CompactFreshness: React.FC<{ lastCommit: string }> = ({ lastCommit }) => {
  const diffTime = Math.abs(new Date().getTime() - new Date(lastCommit).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let score = 100;
  let status = "Bleeding Edge";
  let color = "text-green-500";
  let bgColor = "bg-green-500";
  let icon = <Zap className="w-4 h-4" />;

  // Decay logic: -0.5 points per day
  score = Math.max(0, 100 - (diffDays * 0.5));

  if (diffDays > 180) {
    status = "Stale";
    color = "text-gray-500";
    bgColor = "bg-gray-500";
    icon = <Box className="w-4 h-4" />;
  } else if (diffDays > 90) {
    status = "Aging";
    color = "text-orange-500";
    bgColor = "bg-orange-500";
    icon = <Clock className="w-4 h-4" />;
  } else if (diffDays > 30) {
    status = "Stable";
    color = "text-blue-500";
    bgColor = "bg-blue-500";
    icon = <Activity className="w-4 h-4" />;
  }

  return (
    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/10">
       <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
             <div className={`${color}`}>{icon}</div>
             <span className={`text-xs font-bold uppercase tracking-wide ${color}`}>{status}</span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">{diffDays}d ago</span>
       </div>
       <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-1.5 rounded-full ${bgColor} transition-all duration-1000 ease-out`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, episodeTitles, isOpen, onClose }) => {
  const [stats, setStats] = useState<GithubStats | null>(null);

  useEffect(() => {
    if (isOpen && project) {
      setStats(project.githubStats || generateMockStats());
    }
  }, [isOpen, project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#0B0F19] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Section */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800/50 gap-4">
          <div className="flex-1 min-w-0 pr-8 sm:pr-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-600 text-white shadow-sm shadow-blue-500/30">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-2">
              {project.name}
            </h2>
            {episodeTitles.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="opacity-60 py-0.5">Featured in:</span>
                {episodeTitles.map((title, idx) => (
                  <span key={idx} className="font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/10">
                    {title}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-3 shrink-0 ml-4 absolute top-4 right-4 sm:static sm:top-auto sm:right-auto sm:ml-6">
            <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-none -mr-2 -mt-2 hidden sm:block"
            >
                <X className="w-5 h-5" />
            </button>
            <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-none sm:hidden bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            >
                <X className="w-5 h-5" />
            </button>
            
            {stats && (
                <div className="flex flex-col items-end text-[10px] font-mono gap-1.5 mt-8 sm:mt-1 sm:bg-transparent rounded-lg p-2 sm:p-0 backdrop-blur-sm sm:backdrop-blur-none border sm:border-0 border-transparent">
                   <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                      <span className="uppercase tracking-wider opacity-60 text-[9px]">Created</span>
                      <span className="font-medium text-gray-600 dark:text-gray-300">{new Date(stats.createdAt).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                      <span className="uppercase tracking-wider opacity-60 text-[9px]">Last Commit</span>
                      <span className="font-medium text-gray-600 dark:text-gray-300">{new Date(stats.lastCommit).toLocaleDateString()}</span>
                   </div>
                </div>
             )}
          </div>
        </div>

        {/* Unified Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Main Content (Description) */}
            <div className="flex-1 order-2 md:order-1">
              <div className="prose dark:prose-invert max-w-none">
                <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    Project Overview
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Intelligence Sidebar */}
            <div className="w-full md:w-64 flex flex-col gap-4 order-1 md:order-2 shrink-0">
              
              {stats && (
                <>
                  {/* Single Box Stats */}
                  <div className="bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 py-4 shadow-sm">
                    <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-white/5">
                      <div className="flex flex-col items-center gap-1.5 group cursor-help" title="Stars">
                        <Star className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                          {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(stats.stars)}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 group cursor-help" title="Forks">
                        <GitFork className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                          {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(stats.forks)}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 group cursor-help" title="Issues">
                        <AlertCircle className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                          {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(stats.issues)}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 group cursor-help" title="Watchers">
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                          {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(stats.watchers)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Freshness */}
                  <CompactFreshness lastCommit={stats.lastCommit} />
                </>
              )}

              {/* Actions */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-5 h-5 opacity-80" />
                  <span className="font-bold text-sm">Source Code</span>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-blue-700 py-2 rounded-lg font-bold text-xs text-center hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <Github className="w-3.5 h-3.5" />
                  View on GitHub
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
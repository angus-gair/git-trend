import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Star, GitFork, AlertCircle, Clock, Zap, Eye, Terminal, Activity } from 'lucide-react';
import { Project, GithubStats } from '../types';

interface ProjectModalProps {
  project: Project | null;
  episodeTitles: string[];
  isOpen: boolean;
  onClose: () => void;
}

const generateMockStats = (): GithubStats => {
  const now = new Date();
  return {
    stars: Math.floor(Math.random() * 5000) + 100,
    forks: Math.floor(Math.random() * 500) + 20,
    issues: Math.floor(Math.random() * 50),
    watchers: Math.floor(Math.random() * 200) + 10,
    lastCommit: new Date(now.setDate(now.getDate() - Math.floor(Math.random() * 200))).toISOString(),
    createdAt: new Date('2024-01-01').toISOString(),
  };
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
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-concrete-100 dark:bg-[#0f0f0f] border-4 border-black dark:border-concrete-400 shadow-hard-white flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP BAR */}
        <div className="bg-black text-white p-2 flex justify-between items-center select-none">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-safety animate-pulse"></div>
              <span className="font-mono text-xs uppercase tracking-widest">SECURE_VIEWER // ID_{project.rank}</span>
           </div>
           <button onClick={onClose} className="hover:bg-safety hover:text-black p-1 transition-colors">
              <X className="w-5 h-5" />
           </button>
        </div>

        {/* HEADER AREA */}
        <div className="p-6 md:p-8 bg-white dark:bg-black border-b-2 border-black dark:border-concrete-600 relative overflow-hidden">
           {/* Decorative Background Text */}
           <div className="absolute top-0 right-0 text-[10rem] font-black text-black/5 dark:text-white/5 leading-none -translate-y-10 select-none pointer-events-none">
              {project.category.substring(0, 3)}
           </div>

           <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                 <span className="bg-acid text-black px-3 py-1 text-sm font-black uppercase">{project.category}</span>
                 {episodeTitles[0] && <span className="bg-concrete-200 dark:bg-concrete-800 text-black dark:text-white px-3 py-1 text-sm font-mono border border-black dark:border-concrete-500">{episodeTitles[0]}</span>}
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter text-black dark:text-white mb-2">
                 {project.name}
              </h1>
              <div className="h-2 w-24 bg-safety"></div>
           </div>
        </div>

        {/* CONTENT GRID */}
        <div className="flex-1 overflow-y-auto p-0 md:p-0 flex flex-col md:flex-row">
           {/* LEFT: INFO */}
           <div className="flex-1 p-6 md:p-8 font-mono text-sm md:text-base bg-concrete-50 dark:bg-[#121212] text-concrete-900 dark:text-concrete-300 leading-relaxed border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-concrete-600">
              <div className="mb-6">
                 <h3 className="text-xs font-black uppercase text-concrete-400 mb-2">// SYSTEM_DESCRIPTION</h3>
                 <p className="whitespace-pre-wrap">{project.description}</p>
              </div>

              <div className="mb-6">
                 <h3 className="text-xs font-black uppercase text-concrete-400 mb-2">// KEYWORDS</h3>
                 <div className="flex flex-wrap gap-2">
                    {project.keywords?.map(k => (
                       <span key={k} className="text-xs border border-concrete-400 dark:border-concrete-700 px-1.5 py-0.5 text-concrete-600 dark:text-concrete-400 uppercase">
                          {k}
                       </span>
                    ))}
                 </div>
              </div>
           </div>

           {/* RIGHT: STATS */}
           <div className="w-full md:w-80 bg-white dark:bg-black p-6 md:p-8 flex flex-col gap-6">
              {stats && (
                 <div className="grid grid-cols-2 gap-4">
                    <StatBlock label="STARS" value={stats.stars} icon={Star} />
                    <StatBlock label="FORKS" value={stats.forks} icon={GitFork} />
                    <StatBlock label="ISSUES" value={stats.issues} icon={AlertCircle} />
                    <StatBlock label="WATCH" value={stats.watchers} icon={Eye} />
                 </div>
              )}

              <div className="mt-auto">
                 <a 
                    href={project.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase hover:bg-acid hover:text-black transition-colors border-2 border-transparent hover:border-black gap-2"
                 >
                    <Github className="w-5 h-5" />
                    ACCESS_SOURCE
                 </a>
                 <div className="mt-2 text-[10px] text-center font-mono text-concrete-400">
                    SECURE CONNECTION ESTABLISHED
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatBlock = ({ label, value, icon: Icon }: any) => (
   <div className="border-2 border-black dark:border-concrete-700 p-3 hover:bg-concrete-100 dark:hover:bg-concrete-900 transition-colors">
      <div className="flex justify-between items-start mb-1">
         <span className="text-[10px] font-bold text-concrete-400">{label}</span>
         <Icon className="w-3 h-3 text-acid-dark dark:text-acid" />
      </div>
      <div className="text-xl font-black font-mono text-black dark:text-white">
         {new Intl.NumberFormat('en-US', { notation: "compact" }).format(value)}
      </div>
   </div>
);

export default ProjectModal;
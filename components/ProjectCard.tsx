import React from 'react';
import { ExternalLink, Maximize2, Calendar, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  episodeTitle?: string;
  date?: string;
  onClick?: () => void;
  searchTerm?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, episodeTitle, date, onClick, searchTerm = '' }) => {
  // Helper to highlight text
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === highlight.toLowerCase()) {
        return (
          <mark key={index} className="bg-yellow-300 dark:bg-yellow-600/80 text-gray-900 dark:text-white rounded-sm px-0.5 font-medium">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  const getCategoryColor = (category: string) => {
    const normalized = category.toLowerCase();
    if (normalized.includes('vision') || normalized.includes('video')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200 border-pink-200 dark:border-pink-800';
    if (normalized.includes('audio') || normalized.includes('speech')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-amber-200 dark:border-amber-800';
    if (normalized.includes('coding') || normalized.includes('agent')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200 dark:border-blue-800';
    if (normalized.includes('dev tool') || normalized.includes('cli')) return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
    if (normalized.includes('web') || normalized.includes('browser')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';
    if (normalized.includes('security')) return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border-red-200 dark:border-red-800';
    if (normalized.includes('system') || normalized.includes('os')) return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700';
    if (normalized.includes('ai model') || normalized.includes('ml')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 border-purple-200 dark:border-purple-800';
    if (normalized.includes('design') || normalized.includes('ui')) return 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-200 border-fuchsia-200 dark:border-fuchsia-800';
    
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 overflow-hidden h-full group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="flex flex-wrap items-center gap-2 overflow-hidden">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
            {date && (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shrink-0">
                 {date}
               </span>
            )}
            {episodeTitle && (
              <span 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 shrink-0 max-w-[160px]"
                title={episodeTitle}
              >
                <Layers className="w-3 h-3 mr-1.5 shrink-0" />
                <span className="truncate">
                  {getHighlightedText(episodeTitle, searchTerm)}
                </span>
              </span>
            )}
          </div>
          {/* Visual affordance for expanding the card */}
          <div className="p-1 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {getHighlightedText(project.name, searchTerm)}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 line-clamp-3">
          {getHighlightedText(project.description, searchTerm)}
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          View Details
        </span>
        <a 
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors z-10 focus:outline-none focus:underline"
        >
          Source <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
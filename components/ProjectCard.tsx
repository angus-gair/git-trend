import React from 'react';
import { ExternalLink, Maximize2, Command, AppWindow, Terminal, Globe, Smartphone, Monitor, ChevronRight, Hash } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  episodeTitle?: string;
  date?: string;
  onClick?: () => void;
  searchTerm?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, episodeTitle, date, onClick, searchTerm = '' }) => {
  // Highlight helper
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight || !highlight.trim()) return text;

    // Escape regex characters to prevent invalid regex errors and ensure literal matching
    const escapedHighlight = highlight.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create regex with global and case-insensitive flags
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    
    // Split text by regex. Capturing groups are included in the result at odd indices.
    // e.g., "Hello World".split(/(ell)/i) -> ["H", "ell", "o World"]
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      // Odd indices are the matches captured by the regex group
      if (index % 2 === 1) {
        return (
          <mark key={index} className="bg-acid text-black font-bold px-0.5">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  const getBadgeStyles = (category: string) => {
    const normalized = category.toLowerCase();
    
    // Base styles: Solid black box, white text, colored border
    // Shadow is 2px solid white (or black in light mode for contrast if needed, but per request using white aesthetic or just high contrast)
    // Actually, on light backgrounds, a white shadow is invisible. 
    // To match the high-contrast "Cyberpunk/Industrial" look:
    // We use a black shadow in Light Mode, and White Shadow in Dark Mode.
    // However, if the user requested "half amount of white border", they likely see it as white.
    // I will use a shadow that contrasts with the card header.
    
    const base = "border-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all hover:translate-x-[1px] hover:translate-y-[1px] bg-black text-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] hover:shadow-[1px_1px_0px_0px_#000] dark:hover:shadow-[1px_1px_0px_0px_#fff]";
    
    // Border Color Logic
    if (normalized.includes('vision') || normalized.includes('video')) return `${base} border-purple-600`;
    if (normalized.includes('audio') || normalized.includes('speech')) return `${base} border-safety`;
    if (normalized.includes('coding') || normalized.includes('agent')) return `${base} border-acid`;
    if (normalized.includes('web')) return `${base} border-cyan-600`;
    if (normalized.includes('security')) return `${base} border-red-600`;
    if (normalized.includes('data')) return `${base} border-emerald-600`;
    if (normalized.includes('design') || normalized.includes('ui')) return `${base} border-pink-600`;
    if (normalized.includes('ai') || normalized.includes('model')) return `${base} border-indigo-600`;
    
    return `${base} border-concrete-600`;
  };

  const getOsIcon = (os: string) => {
    switch(os) {
      case 'macOS': return <Command className="w-3 h-3" />;
      case 'Windows': return <AppWindow className="w-3 h-3" />;
      case 'Linux': return <Terminal className="w-3 h-3" />;
      case 'Web': return <Globe className="w-3 h-3" />;
      case 'Mobile': return <Smartphone className="w-3 h-3" />;
      default: return <Monitor className="w-3 h-3" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group relative h-full flex flex-col cursor-pointer focus:outline-none select-none"
    >
      {/* Hard Shadow Block - Dynamic Color on Hover */}
      <div className="absolute inset-0 bg-black dark:bg-acid translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-100 ease-linear"></div>
      
      {/* Main Card Chassis */}
      <div className="relative h-full flex flex-col bg-white dark:bg-concrete-900 border-2 border-black dark:border-concrete-100 p-0 transition-transform duration-100 ease-linear group-hover:-translate-x-1 group-hover:-translate-y-1 overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex justify-between items-stretch border-b-2 border-black dark:border-concrete-100 bg-concrete-50 dark:bg-black h-12">
          
          {/* ID Section: Stacked & Technical */}
          <div className="flex items-center px-4 border-r-2 border-black dark:border-concrete-100 bg-white dark:bg-concrete-900 relative">
             {/* Tech Decoration: Corner marker */}
             <div className="absolute top-1 left-1 w-1 h-1 bg-concrete-300 dark:bg-concrete-700"></div>
             
             <div className="flex flex-col justify-center h-full pt-1">
                <span className="text-[7px] font-bold text-concrete-400 uppercase tracking-widest leading-none mb-0.5">Ref.ID</span>
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3 h-3 text-concrete-300 dark:text-concrete-600" />
                  <span className="font-mono text-xl font-black text-black dark:text-white tracking-tighter leading-none">
                    {project.rank.replace(/[^0-9]/g, '').padStart(3, '0')}
                  </span>
                </div>
             </div>
          </div>

          {/* Category Section: Right Aligned with Pattern Background */}
          <div className="flex-1 flex items-center justify-end px-3 gap-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]">
             <span className={getBadgeStyles(project.category)}>
                {project.category}
             </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col flex-1 relative">
           {/* Decorative Left Border Line */}
           <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-transparent group-hover:bg-acid transition-colors duration-300"></div>

          <h3 className="text-xl md:text-2xl font-black uppercase leading-[0.9] mb-4 text-black dark:text-white group-hover:text-acid-dark dark:group-hover:text-acid transition-colors pt-1">
            {getHighlightedText(project.name, searchTerm)}
          </h3>
          
          {/* Technical Divider */}
          <div className="flex items-center gap-2 mb-4 opacity-60">
             <div className="h-1.5 w-1.5 bg-black dark:bg-white"></div>
             <div className="h-[2px] w-8 bg-black dark:bg-white"></div>
             <div className="h-[1px] flex-1 bg-concrete-300 dark:bg-concrete-700"></div>
          </div>

          <p className="font-mono text-xs leading-relaxed text-concrete-700 dark:text-concrete-300 line-clamp-4 mb-5 font-medium">
            {getHighlightedText(project.description, searchTerm)}
          </p>

          <div className="mt-auto pt-2 flex justify-between items-end">
             {/* OS Icons: Port Style */}
            <div className="flex -space-x-[2px] pb-1">
              {project.os?.slice(0, 3).map((os, i) => (
                <div key={os} 
                     className="relative w-8 h-8 flex items-center justify-center bg-concrete-50 dark:bg-concrete-800 border-2 border-black dark:border-concrete-500 hover:z-10 hover:border-acid hover:text-black hover:bg-acid transition-all" 
                     title={os}
                >
                  {/* Port Detail */}
                  <div className="absolute top-0.5 right-0.5 w-[1px] h-[1px] bg-concrete-400"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-[1px] h-[1px] bg-concrete-400"></div>
                  {getOsIcon(os)}
                </div>
              ))}
            </div>
            
            {/* Action Button Style */}
            <div className="flex items-center gap-1 text-[10px] font-black uppercase bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 border-2 border-transparent hover:border-acid hover:text-acid dark:hover:text-acid-dark transition-colors">
              <span>Inspect</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
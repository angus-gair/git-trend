import React from 'react';
import { Calendar, Tag, Zap, Monitor, Square } from 'lucide-react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import { GroupByOption } from './ViewControls';

interface ProjectGroupListProps {
  groups: Record<string, Project[]>;
  onProjectClick: (project: Project, episodeTitle?: string) => void;
  searchTerm?: string;
  groupBy: GroupByOption;
}

const ProjectGroupList: React.FC<ProjectGroupListProps> = ({ 
  groups, 
  onProjectClick, 
  searchTerm = '',
  groupBy
}) => {
  const groupKeys = Object.keys(groups);

  const getGroupIcon = (groupName: string) => {
    switch (groupBy) {
      case 'month': return <Calendar className="w-5 h-5 text-black dark:text-acid" />;
      case 'freshness': return <Zap className="w-5 h-5 text-safety" />;
      case 'category': return <Tag className="w-5 h-5 text-concrete-500" />;
      case 'os': return <Monitor className="w-5 h-5 text-black dark:text-white" />;
      default: return <Square className="w-5 h-5 text-acid" />;
    }
  };

  return (
    <div className="space-y-20 min-h-[50vh]">
      {groupKeys.length === 0 ? (
        <div 
          key="empty" 
          className="p-12 border-2 border-dashed border-concrete-400 dark:border-concrete-700 text-center animate-fade-in-up"
        >
          <p className="text-xl font-bold uppercase font-mono text-concrete-500">
            // DATA_VOID: NO_MATCHES_FOUND
          </p>
        </div>
      ) : (
        // Keying by groupBy ensures the container remounts and triggers animations when the view changes
        <div key={groupBy} className="space-y-20">
          {groupKeys.map((groupName, index) => (
            <section 
              key={groupName} 
              className="relative opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {groupBy !== 'none' && (
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-black border-2 border-black dark:border-white shadow-hard-sm">
                    {getGroupIcon(groupName)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white leading-none">
                      {groupName}
                    </h2>
                    <div className="h-1 w-full bg-acid mt-1"></div>
                  </div>
                  <div className="ml-auto bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-sm font-mono font-bold border-2 border-transparent">
                    N:{groups[groupName].length.toString().padStart(2, '0')}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groups[groupName].map((project, idx) => (
                  <ProjectCard 
                    key={`${groupName}-${idx}-${project.name}`} 
                    project={project} 
                    date={groupBy === 'month' ? undefined : (project.githubStats ? new Date(project.githubStats.createdAt).toLocaleDateString() : undefined)}
                    onClick={() => onProjectClick(project)}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGroupList;
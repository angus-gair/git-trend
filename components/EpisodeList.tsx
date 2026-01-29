import React from 'react';
import { Calendar, Globe, Hash, Tag, Zap, FolderOpen } from 'lucide-react';
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

  // Helper to get icon for group header
  const getGroupIcon = (groupName: string) => {
    switch (groupBy) {
      case 'month': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'freshness': return <Zap className="w-5 h-5 text-green-500" />;
      case 'category': return <Tag className="w-5 h-5 text-purple-500" />;
      default: return <FolderOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  // Helper to get description for freshness groups
  const getGroupDesc = (groupName: string) => {
    if (groupBy !== 'freshness') return null;
    if (groupName === 'Bleeding Edge') return "Updated within the last 30 days";
    if (groupName === 'Stable') return "Updated 1-3 months ago";
    if (groupName === 'Aging') return "Updated 3-6 months ago";
    if (groupName === 'Stale') return "No updates for 6+ months";
    return null;
  };

  return (
    <div className="space-y-12">
      {groupKeys.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found.</p>
        </div>
      ) : (
        groupKeys.map((groupName) => (
          <section key={groupName} className="animate-fade-in">
            {groupBy !== 'none' && (
              <div className="flex flex-col mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  {getGroupIcon(groupName)}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {groupName}
                  </h2>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {groups[groupName].length}
                  </span>
                </div>
                {getGroupDesc(groupName) && (
                  <p className="text-sm text-gray-500 mt-1 ml-8">{getGroupDesc(groupName)}</p>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups[groupName].map((project, idx) => (
                <ProjectCard 
                  key={`${groupName}-${idx}-${project.name}`} 
                  project={project} 
                  // In grouped view, we might not always want to show the specific episode title on the card
                  // if we are already grouping by something else, but keeping it for context is usually good.
                  episodeTitle={undefined} 
                  date={groupBy === 'month' ? undefined : (project.githubStats ? new Date(project.githubStats.createdAt).toLocaleDateString() : undefined)}
                  onClick={() => onProjectClick(project)}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default ProjectGroupList;
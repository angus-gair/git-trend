import React from 'react';
import { AlignLeft, Layers, Calendar, Zap, Tag, Grid } from 'lucide-react';

export type GroupByOption = 'none' | 'month' | 'category' | 'freshness';
export type ProjectSortOption = 'rank' | 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest';

interface ViewControlsProps {
  groupBy: GroupByOption;
  setGroupBy: (group: GroupByOption) => void;
  projectSort: ProjectSortOption;
  setProjectSort: (sort: ProjectSortOption) => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({
  groupBy,
  setGroupBy,
  projectSort,
  setProjectSort
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
      
      {/* Group By Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 px-2 scrollbar-hide">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold whitespace-nowrap mr-1">Group By:</span>
        
        <button
          onClick={() => setGroupBy('none')}
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${groupBy === 'none' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-700' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <Grid className="w-3.5 h-3.5 mr-1.5" />
          All
        </button>

        <button
          onClick={() => setGroupBy('month')}
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${groupBy === 'month' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-blue-100 dark:ring-blue-800' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          Month
        </button>

        <button
          onClick={() => setGroupBy('category')}
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${groupBy === 'category' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm ring-1 ring-purple-100 dark:ring-purple-800' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <Tag className="w-3.5 h-3.5 mr-1.5" />
          Category
        </button>

        <button
          onClick={() => setGroupBy('freshness')}
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${groupBy === 'freshness' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 shadow-sm ring-1 ring-green-100 dark:ring-green-800' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Freshness
        </button>
      </div>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

      {/* Project Sort */}
      <div className="flex items-center gap-2 px-2">
         <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold whitespace-nowrap">Sort:</span>
         <select
           value={projectSort}
           onChange={(e) => setProjectSort(e.target.value as ProjectSortOption)}
           className="bg-transparent text-gray-700 dark:text-gray-200 text-sm font-medium focus:outline-none focus:ring-0 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
         >
           <option value="rank">Trending Rank</option>
           <option value="date-newest">Newest First</option>
           <option value="date-oldest">Oldest First</option>
           <option value="name-asc">Name (A-Z)</option>
         </select>
      </div>
    </div>
  );
};

export default ViewControls;
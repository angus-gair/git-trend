import React from 'react';
import { Calendar, Zap, Tag, Grid, Monitor, List, Check, Filter } from 'lucide-react';

export type GroupByOption = 'none' | 'month' | 'category' | 'freshness' | 'os';
export type ProjectSortOption = 'rank' | 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest';

interface ViewControlsProps {
  groupBy: GroupByOption;
  setGroupBy: (group: GroupByOption) => void;
  projectSort: ProjectSortOption;
  setProjectSort: (sort: ProjectSortOption) => void;
  osFilter: string;
  setOsFilter: (os: string) => void;
  availableOS: string[];
}

const ViewControls: React.FC<ViewControlsProps> = ({
  groupBy,
  setGroupBy,
  projectSort,
  setProjectSort,
  osFilter,
  setOsFilter,
  availableOS
}) => {
  const Tab = ({ active, onClick, icon: Icon, label }: any) => (
    <button
      onClick={onClick}
      className={`
        relative group flex items-center justify-center px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-black dark:border-concrete-400 transition-all
        ${active 
          ? 'bg-acid text-black translate-y-1' 
          : 'bg-white dark:bg-black text-concrete-500 dark:text-concrete-400 hover:text-black dark:hover:text-white hover:border-acid'}
      `}
    >
      {active && (
         <div className="absolute top-0 right-0 p-0.5">
            <div className="w-1.5 h-1.5 bg-black"></div>
         </div>
      )}
      <Icon className="w-3 h-3 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      
      {/* Group By Controls */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-mono font-bold uppercase text-concrete-500 ml-1">// ORGANIZE_BY</span>
        <div className="flex flex-wrap gap-2">
          <Tab active={groupBy === 'none'} onClick={() => setGroupBy('none')} icon={Grid} label="RAW" />
          <Tab active={groupBy === 'month'} onClick={() => setGroupBy('month')} icon={Calendar} label="TIME" />
          <Tab active={groupBy === 'category'} onClick={() => setGroupBy('category')} icon={Tag} label="TYPE" />
          <Tab active={groupBy === 'freshness'} onClick={() => setGroupBy('freshness')} icon={Zap} label="LIVE" />
          <Tab active={groupBy === 'os'} onClick={() => setGroupBy('os')} icon={Monitor} label="SYS" />
        </div>
      </div>

      <div className="hidden xl:block w-px bg-concrete-300 dark:bg-concrete-700 mx-2"></div>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        
        {/* OS Filter */}
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-[10px] font-mono font-bold uppercase text-concrete-500 ml-1">// SYSTEM_FILTER</span>
          <div className="relative">
            <select
              value={osFilter}
              onChange={(e) => setOsFilter(e.target.value)}
              className="w-full appearance-none bg-concrete-100 dark:bg-concrete-900 border-2 border-black dark:border-concrete-500 text-sm font-bold font-mono uppercase py-2 pl-4 pr-10 focus:outline-none focus:border-acid transition-colors cursor-pointer"
            >
              <option value="ALL">ALL SYSTEMS</option>
              {availableOS.map(os => (
                <option key={os} value={os}>{os.toUpperCase()}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black dark:text-white bg-concrete-300 dark:bg-concrete-700 border-l-2 border-black dark:border-concrete-500">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Project Sort */}
        <div className="flex flex-col gap-2 flex-1">
           <span className="text-[10px] font-mono font-bold uppercase text-concrete-500 ml-1">// SEQUENCE_BY</span>
           <div className="relative">
             <select
               value={projectSort}
               onChange={(e) => setProjectSort(e.target.value as ProjectSortOption)}
               className="w-full appearance-none bg-concrete-100 dark:bg-concrete-900 border-2 border-black dark:border-concrete-500 text-sm font-bold font-mono uppercase py-2 pl-4 pr-10 focus:outline-none focus:border-acid transition-colors cursor-pointer"
             >
               <option value="rank">TREND_INDEX</option>
               <option value="date-newest">DATE [DESC]</option>
               <option value="date-oldest">DATE [ASC]</option>
               <option value="name-asc">ALPHA [A-Z]</option>
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black dark:text-white bg-concrete-300 dark:bg-concrete-700 border-l-2 border-black dark:border-concrete-500">
               <List className="h-4 w-4" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ViewControls;
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <span className="text-acid font-bold text-lg">{'>'}</span>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-12 py-3.5 
          bg-white dark:bg-black 
          border-2 border-concrete-300 dark:border-concrete-800
          text-black dark:text-acid
          placeholder-concrete-400
          font-mono font-bold text-lg uppercase
          focus:outline-none focus:border-acid focus:ring-0
          shadow-sm focus:shadow-hard
          transition-all duration-150"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        {value ? (
           <span className="w-2 h-4 bg-acid animate-pulse"></span>
        ) : (
           <Search className="h-5 w-5 text-concrete-400" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
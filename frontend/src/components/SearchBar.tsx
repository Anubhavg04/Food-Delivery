import React from 'react';
import { Search } from 'lucide-react';

type Props = { query: string; setQuery: (s: string) => void };

const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <div className="w-full">
      <div
        className="
          relative bg-white/80 dark:bg-gray-800/60
          backdrop-blur-xl shadow-md
          flex items-center gap-3 
          px-4 py-3 rounded-2xl
          border border-gray-200/60 dark:border-gray-700
          transition-all duration-300
          focus-within:shadow-xl focus-within:border-red-400
        "
      >
        {/* ICON */}
        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />

        {/* INPUT */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants, cuisine or dishes..."
          className="
            w-full bg-transparent outline-none
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            text-base
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;

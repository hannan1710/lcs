import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search services..." }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="Search" size={20} className="text-muted-foreground" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e?.target?.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-luxury"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-accent transition-luxury"
        >
          <Icon name="X" size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
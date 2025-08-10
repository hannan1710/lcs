import React from 'react';

const FilterChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex space-x-3 min-w-max px-6 lg:px-8">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-luxury ${
              activeCategory === category?.id
                ? 'bg-accent text-accent-foreground shadow-luxury'
                : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
            }`}
          >
            {category?.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;
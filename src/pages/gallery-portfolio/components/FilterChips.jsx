import React from 'react';

const FilterChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex space-x-3 min-w-max px-4 md:px-6 lg:px-8">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
              activeCategory === category?.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-600'
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

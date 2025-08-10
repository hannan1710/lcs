import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <div className="flex space-x-3 px-6">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-luxury ${
                activeCategory === category?.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span className="text-sm font-medium">{category?.name}</span>
              <span className="text-xs opacity-75">({category?.count})</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-luxury p-6 sticky top-24">
      <h3 className="font-heading font-semibold text-lg mb-4">Service Categories</h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-luxury ${
              activeCategory === category?.id
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-muted text-card-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={category?.icon} size={20} />
              <span className="font-medium">{category?.name}</span>
            </div>
            <span className="text-sm opacity-75">({category?.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
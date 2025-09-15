import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context with undefined default value for better HMR compatibility
const CategoryContext = createContext(undefined);

// Custom hook to use the category context
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Default categories
  const defaultCategories = [
    { id: 'hair', name: 'Hair Services', icon: 'Scissors', color: '#8B5CF6' },
    { id: 'nails', name: 'Nail Services', icon: 'Heart', color: '#EC4899' },
    { id: 'skincare', name: 'Skincare', icon: 'Sparkles', color: '#10B981' },
    { id: 'massage', name: 'Massage', icon: 'Hand', color: '#F59E0B' },
    { id: 'makeup', name: 'Makeup', icon: 'Palette', color: '#EF4444' },
    { id: 'other', name: 'Other', icon: 'Grid3X3', color: '#6B7280' }
  ];

  // Load categories data from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('salon_categories_data');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Error loading categories data from localStorage:', error);
        setCategories(defaultCategories);
      }
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  // Save categories data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('salon_categories_data', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.id || `category_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, updates) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id 
          ? { ...category, ...updates, updatedAt: new Date().toISOString() }
          : category
      )
    );
  };

  const deleteCategory = (id) => {
    // Don't allow deletion of default categories
    const defaultCategoryIds = defaultCategories.map(cat => cat.id);
    if (defaultCategoryIds.includes(id)) {
      throw new Error('Cannot delete default categories');
    }
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const getCategoryById = (id) => {
    return categories.find(category => category.id === id);
  };

  const getCategoriesForSelect = () => {
    return categories.map(category => ({
      value: category.id,
      label: category.name,
      icon: category.icon,
      color: category.color
    }));
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategoriesForSelect,
    setCategories
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

// Add display name for better debugging and HMR
CategoryProvider.displayName = 'CategoryProvider';


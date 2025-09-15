import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context with undefined default value for better HMR compatibility
const GalleryContext = createContext(undefined);

// Custom hook to use the gallery context
export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider = ({ children }) => {
  const [galleryData, setGalleryData] = useState([
    {
      id: 1,
      title: "Sample Hair Cut",
      description: "A beautiful hair transformation",
      category: "hair",
      tags: "haircut, styling",
      featured: true,
      media: [
        {
          id: "sample-1",
          name: "sample.jpg",
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
          altText: "Sample hair cut"
        }
      ],
      createdAt: new Date().toISOString()
    }
  ]);

  // Load gallery data from localStorage on mount
  useEffect(() => {
    const savedGallery = localStorage.getItem('salon_gallery_data');
    if (savedGallery) {
      try {
        setGalleryData(JSON.parse(savedGallery));
      } catch (error) {
        console.error('Error loading gallery data from localStorage:', error);
      }
    }
  }, []);

  // Save gallery data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('salon_gallery_data', JSON.stringify(galleryData));
  }, [galleryData]);

  const addGalleryItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setGalleryData(prev => [...prev, newItem]);
    return newItem;
  };

  const updateGalleryItem = (id, updates) => {
    setGalleryData(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteGalleryItem = (id) => {
    setGalleryData(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    galleryData,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    setGalleryData
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};

// Add display name for better debugging and HMR
GalleryProvider.displayName = 'GalleryProvider';

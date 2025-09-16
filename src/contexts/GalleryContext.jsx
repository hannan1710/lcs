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
  const [galleryData, setGalleryData] = useState([]);
  const [homepageGallery, setHomepageGallery] = useState([]);

  // Default gallery data - simplified for testing
  const defaultGalleryData = [
    {
      id: 1,
      title: "Professional Hair Styling",
      description: "Expert hair styling and cutting services at La Coiffure Salon",
      category: "hair",
      tags: "haircut, styling, professional, salon",
      featured: true,
      media: [
        {
          id: "gallery-1",
          name: "1.jpg",
          type: "image/jpeg",
          url: "/1.jpg",
          altText: "Professional hair styling and cutting services at La Coiffure Salon"
        }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Precision Hair Cutting",
      description: "Master precision hair cutting techniques for perfect results",
      category: "hair",
      tags: "haircut, precision, cutting, master",
      featured: true,
      media: [
        {
          id: "gallery-2",
          name: "2.jpg",
          type: "image/jpeg",
          url: "/2.jpg",
          altText: "Precision hair cutting services at La Coiffure Salon"
        }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Hair Color Transformation",
      description: "Beautiful hair color transformations and highlights",
      category: "color",
      tags: "hair color, highlights, transformation, beauty",
      featured: true,
      media: [
        {
          id: "gallery-3",
          name: "3.jpg",
          type: "image/jpeg",
          url: "/3.jpg",
          altText: "Hair color transformation services at La Coiffure Salon"
        }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: "Luxury Salon Experience",
      description: "Premium salon experience with modern facilities",
      category: "salon",
      tags: "luxury, salon, experience, premium",
      featured: false,
      media: [
        {
          id: "gallery-4",
          name: "4.jpg",
          type: "image/jpeg",
          url: "/4.jpg",
          altText: "Luxury salon experience at La Coiffure"
        }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      title: "Bridal Hair Styling",
      description: "Elegant bridal hair styling for special occasions",
      category: "bridal",
      tags: "bridal, wedding, elegant, special occasion",
      featured: true,
      media: [
        {
          id: "gallery-5",
          name: "5.jpg",
          type: "image/jpeg",
          url: "/5.jpg",
          altText: "Bridal hair styling services at La Coiffure Salon"
        }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      title: "Hair Treatment Services",
      description: "Professional hair treatment and care services",
      category: "hair",
      tags: "hair treatment, care, professional, health",
      featured: false,
      media: [
        {
          id: "gallery-6",
          name: "6.jpg",
          type: "image/jpeg",
          url: "/6.jpg",
          altText: "Professional hair treatment services at La Coiffure Salon"
        }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      title: "Men's Grooming Services",
      description: "Expert men's grooming and styling services",
      category: "hair",
      tags: "men's grooming, styling, haircut, professional",
      featured: false,
      media: [
        {
          id: "gallery-7",
          name: "7.jpg",
          type: "image/jpeg",
          url: "/7.jpg",
          altText: "Men's grooming services at La Coiffure Salon"
        }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      title: "Salon Interior & Atmosphere",
      description: "Beautiful salon interior and relaxing atmosphere",
      category: "salon",
      tags: "salon interior, atmosphere, luxury, comfort",
      featured: false,
      media: [
        {
          id: "gallery-8",
          name: "8.jpg",
          type: "image/jpeg",
          url: "/8.jpg",
          altText: "La Coiffure Salon interior and atmosphere"
        }
      ],
      createdAt: new Date().toISOString()
    }
  ];

  // Load gallery data from localStorage on mount
  useEffect(() => {
    console.log('GalleryContext: Loading gallery data...');
    const savedGallery = localStorage.getItem('salon_gallery_data');
    if (savedGallery) {
      try {
        const parsedData = JSON.parse(savedGallery);
        console.log('GalleryContext: Loaded from localStorage:', parsedData);
        setGalleryData(parsedData);
      } catch (error) {
        console.error('Error loading gallery data from localStorage:', error);
        // If parsing fails, use default data
        console.log('GalleryContext: Using default data due to parse error');
        setGalleryData(defaultGalleryData);
        localStorage.setItem('salon_gallery_data', JSON.stringify(defaultGalleryData));
      }
    } else {
      // If no saved data, use default data
      console.log('GalleryContext: No saved data, using default data');
      setGalleryData(defaultGalleryData);
      localStorage.setItem('salon_gallery_data', JSON.stringify(defaultGalleryData));
    }
  }, []);

  // Save gallery data to localStorage whenever it changes
  useEffect(() => {
    if (galleryData && galleryData.length > 0) {
      localStorage.setItem('salon_gallery_data', JSON.stringify(galleryData));
    }
  }, [galleryData]);

  // Load homepage selection when gallery data changes
  useEffect(() => {
    if (galleryData && galleryData.length > 0) {
      loadHomepageSelection();
    } else if (galleryData && galleryData.length === 0) {
      // If no gallery data, set homepage to empty array
      setHomepageGallery([]);
    }
  }, [galleryData]);

  const addGalleryItem = (item) => {
    console.log('GalleryContext - Adding new item:', item);
    const newItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    console.log('GalleryContext - New item created:', newItem);
    // Gallery item added successfully
    setGalleryData(prev => {
      const updated = [...prev, newItem];
      console.log('GalleryContext - Updated gallery data:', updated);
      return updated;
    });
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

  const refreshGalleryData = () => {
    const savedGallery = localStorage.getItem('salon_gallery_data');
    if (savedGallery) {
      try {
        const parsedData = JSON.parse(savedGallery);
        setGalleryData(parsedData);
      } catch (error) {
        console.error('Error refreshing gallery data:', error);
      }
    } else {
      setGalleryData(defaultGalleryData);
      localStorage.setItem('salon_gallery_data', JSON.stringify(defaultGalleryData));
    }
  };

  // Homepage gallery management
  const updateHomepageGallery = (selectedIds) => {
    const selectedItems = galleryData.filter(item => selectedIds.includes(item.id));
    setHomepageGallery(selectedItems);
    localStorage.setItem('homepage_gallery_selection', JSON.stringify(selectedIds));
  };

  const getHomepageGallery = () => {
    return homepageGallery.length > 0 ? homepageGallery : galleryData.slice(0, 8);
  };

  const loadHomepageSelection = () => {
    const savedSelection = localStorage.getItem('homepage_gallery_selection');
    if (savedSelection) {
      try {
        const selectedIds = JSON.parse(savedSelection);
        const selectedItems = galleryData.filter(item => selectedIds.includes(item.id));
        setHomepageGallery(selectedItems);
      } catch (error) {
        console.error('Error loading homepage selection:', error);
        // Fallback to first 8 images
        setHomepageGallery(galleryData.slice(0, 8));
      }
    } else {
      // No saved selection, use first 8 images as default
      setHomepageGallery(galleryData.slice(0, 8));
    }
  };

  const value = {
    galleryData,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    setGalleryData,
    refreshGalleryData,
    homepageGallery,
    updateHomepageGallery,
    getHomepageGallery,
    loadHomepageSelection
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};

// Add display name for better debugging and HMR
GalleryProvider.displayName = 'GalleryProvider';

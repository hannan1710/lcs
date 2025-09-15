import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context with undefined default value for better HMR compatibility
const ServiceContext = createContext(undefined);

// Custom hook to use the service context
export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  // Load services data from localStorage on mount
  useEffect(() => {
    const savedServices = localStorage.getItem('salon_services_data');
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch (error) {
        console.error('Error loading services data from localStorage:', error);
      }
    } else {
      // Initialize with default services if no data exists
      const defaultServices = [
        {
          id: 1,
          name: "Signature Hair Cut & Style",
          category: "hair",
          image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
          duration: 90,
          description: "Premium precision cut with personalized styling consultation and luxury finishing.",
          fullDescription: "Experience our signature hair cutting service that combines precision technique with artistic vision. Our master stylists begin with a comprehensive consultation to understand your lifestyle, face shape, and personal style preferences.\n\nUsing advanced cutting techniques and premium tools, we create a customized look that enhances your natural beauty while being easy to maintain at home.",
          status: "active",
          featured: true,
          tags: ["precision", "styling", "consultation"],
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Color Transformation",
          category: "color",
          image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
          duration: 120,
          description: "Complete color makeover with premium products and expert colorist consultation.",
          fullDescription: "Transform your look with our comprehensive color services. Our certified colorists use only the finest professional-grade products to achieve your desired shade while maintaining hair health.\n\nFrom subtle highlights to dramatic color changes, we provide personalized color solutions that complement your skin tone and lifestyle.",
          status: "active",
          featured: true,
          tags: ["color", "transformation", "premium"],
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Bridal Hair & Makeup",
          category: "bridal",
          image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
          duration: 180,
          description: "Complete bridal beauty package with trial session and day-of coordination.",
          fullDescription: "Make your special day perfect with our comprehensive bridal beauty services. We offer a complete package including hair styling, makeup application, and coordination to ensure you look and feel absolutely stunning.\n\nOur bridal specialists work with you through trial sessions to perfect your look, ensuring everything is exactly as you envision for your wedding day.",
          status: "active",
          featured: true,
          tags: ["bridal", "makeup", "special occasion"],
          createdAt: new Date().toISOString()
        }
      ];
      setServices(defaultServices);
    }
  }, []);

  // Save services data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('salon_services_data', JSON.stringify(services));
  }, [services]);

  const addService = (service) => {
    const newService = {
      ...service,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setServices(prev => [...prev, newService]);
    return newService;
  };

  const updateService = (id, updates) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, ...updates, updatedAt: new Date().toISOString() }
          : service
      )
    );
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const value = {
    services,
    addService,
    updateService,
    deleteService,
    setServices
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};

// Add display name for better debugging and HMR
ServiceProvider.displayName = 'ServiceProvider';

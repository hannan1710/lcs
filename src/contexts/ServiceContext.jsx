import React, { createContext, useContext, useState, useEffect } from 'react';

const ServiceContext = createContext(undefined);

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  // Load services from localStorage on mount
  useEffect(() => {
    console.log('ServiceContext - Loading services from localStorage...');
    const savedServices = localStorage.getItem('salon_services_data');
    console.log('ServiceContext - Raw saved services:', savedServices);
    if (savedServices) {
      try {
        const parsedData = JSON.parse(savedServices);
        console.log('ServiceContext - Parsed services:', parsedData);
        
        // Ensure all services have a featured field (default to false if not set)
        const servicesWithFeatured = parsedData.map(service => ({
          ...service,
          featured: service.featured !== undefined ? service.featured : false
        }));
        
        setServices(servicesWithFeatured);
      } catch (error) {
        console.error('Error loading services from localStorage:', error);
        setServices([]);
      }
    } else {
      console.log('ServiceContext - No saved services found, initializing with sample services');
      // Initialize with some sample featured services if no services exist
      const sampleServices = [
        {
          id: 1,
          name: "Signature Hair Cut & Style",
          category: "hair",
          image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
          duration: "90 min",
          description: "Premium precision cut with personalized styling consultation and luxury finishing.",
          featured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Balayage Color Treatment",
          category: "color",
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
          duration: "3-4 hours",
          description: "Hand-painted highlights for natural, sun-kissed dimension with premium color products.",
          featured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Bridal Hair & Makeup",
          category: "styling",
          image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=300&fit=crop",
          duration: "4-5 hours",
          description: "Complete bridal beauty package with trial session and wedding day styling.",
          featured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          name: "Keratin Smoothing Treatment",
          category: "treatments",
          image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop",
          duration: "2-3 hours",
          description: "Professional smoothing treatment for frizz-free, manageable hair that lasts months.",
          featured: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 5,
          name: "Luxury Facial Treatment",
          category: "spa",
          image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
          duration: "75 min",
          description: "Customized facial treatment with premium products for radiant, healthy skin.",
          featured: false,
          createdAt: new Date().toISOString()
        }
      ];
      setServices(sampleServices);
    }
  }, []);

  // Save services to localStorage whenever it changes
  useEffect(() => {
    if (services && services.length >= 0) {
      localStorage.setItem('salon_services_data', JSON.stringify(services));
    }
  }, [services]);

  const addService = (service) => {
    console.log('ServiceContext - addService called with:', service);
    
    const newService = {
      ...service,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    console.log('ServiceContext - newService created:', newService);
    
    setServices(prev => {
      const updated = [...prev, newService];
      console.log('ServiceContext - services updated:', updated);
      return updated;
    });
    
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

  const refreshServices = () => {
    console.log('ServiceContext - refreshServices called');
    const savedServices = localStorage.getItem('salon_services_data');
    console.log('ServiceContext - refreshServices - Raw saved services:', savedServices);
    if (savedServices) {
      try {
        const parsedData = JSON.parse(savedServices);
        console.log('ServiceContext - refreshServices - Parsed services:', parsedData);
        
        // Ensure all services have a featured field (default to false if not set)
        const servicesWithFeatured = parsedData.map(service => ({
          ...service,
          featured: service.featured !== undefined ? service.featured : false
        }));
        
        setServices(servicesWithFeatured);
      } catch (error) {
        console.error('Error refreshing services:', error);
      }
    } else {
      console.log('ServiceContext - refreshServices - No saved services found');
    }
  };

  const value = {
    services,
    addService,
    updateService,
    deleteService,
    setServices,
    refreshServices
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};

ServiceProvider.displayName = 'ServiceProvider';
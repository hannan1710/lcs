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
        setServices(parsedData);
      } catch (error) {
        console.error('Error loading services from localStorage:', error);
        setServices([]);
      }
    } else {
      console.log('ServiceContext - No saved services found');
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
        setServices(parsedData);
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
import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ServiceSelection = ({ services, selectedServices, onServiceToggle }) => {
  // Group services by category
  const groupedServices = services?.reduce((acc, service) => {
    const category = service?.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Select Your Services
        </h2>
        <p className="text-muted-foreground">
          Choose from our premium collection of luxury treatments
        </p>
      </div>

      {Object.keys(groupedServices || {})?.map((category) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-heading font-semibold text-foreground border-b pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groupedServices[category]?.map((service) => {
              const isSelected = selectedServices?.some(s => s?.id === service?.id);
              
              return (
                <div
                  key={service?.id}
                  onClick={() => onServiceToggle(service)}
                  className={`relative bg-card rounded-lg border-2 cursor-pointer transition-luxury hover:shadow-luxury-hover ${
                    isSelected 
                      ? 'border-accent shadow-luxury' 
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                    <Image
                      src={service?.image}
                      alt={service?.name}
                      className="w-full h-full object-cover transition-luxury hover:scale-105"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground">
                        {service?.name}
                      </h3>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-luxury ${
                        isSelected 
                          ? 'bg-accent border-accent' :'border-muted-foreground'
                      }`}>
                        {isSelected && (
                          <Icon name="Check" size={12} color="var(--color-accent-foreground)" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                      {service?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>{service?.duration}</span>
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-accent">
                        ${service?.price}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-accent text-accent-foreground rounded-full p-1.5 sm:p-2">
                      <Icon name="Check" size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelection;
import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onBookNow, onViewDetails }) => {
  return (
    <div className="bg-card rounded-lg shadow-luxury hover:shadow-luxury-hover transition-luxury-slow overflow-hidden group">
      <div className="relative h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden">
        <Image
          src={service?.image}
          alt={service?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-luxury-slow"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {service?.duration}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="font-heading font-semibold text-sm sm:text-base md:text-lg text-card-foreground group-hover:text-accent transition-luxury">
            {service?.name}
          </h3>
          {/* <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting at</p>
          </div> */}
        </div>
        
        <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2">
          {service?.description}
        </p>
        
        <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
          <Icon name="Star" size={12} className="text-accent mr-1" />
          <span className="text-xs sm:text-sm text-muted-foreground">
            {service?.rating} ({service?.reviewCount} reviews)
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(service)}
            className="flex-1 border-border hover:border-accent hover:text-accent text-xs"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onBookNow(service)}
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
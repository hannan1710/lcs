import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylistCard = ({ stylist, onViewDetails, onBookAppointment }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-card rounded-lg shadow-luxury hover:shadow-luxury-hover transition-luxury-slow overflow-hidden group">
      {/* Profile Image */}
      <div className="relative h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden bg-muted">
        <Image
          src={stylist?.image}
          alt={`${stylist?.name} - Professional Stylist`}
          className={`w-full h-full object-cover transition-luxury-slow group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="User" size={24} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Experience Badge */}
        <div className="absolute top-1 right-1 bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full text-xs font-medium">
          {stylist?.experience}+
        </div>
      </div>
      
      {/* Content */}
      <div className="p-2 sm:p-2.5 md:p-3">
        {/* Name and Title */}
        <div className="mb-2">
          <h3 className="font-heading text-xs sm:text-sm font-semibold text-foreground mb-0.5">
            {stylist?.name}
          </h3>
          <p className="text-accent font-medium text-[11px] sm:text-xs">{stylist?.title}</p>
        </div>

        {/* Specialties */}
        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            {stylist?.specialties?.slice(0, 2)?.map((specialty, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
            {stylist?.specialties?.length > 2 && (
              <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                +{stylist?.specialties?.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2.5">
          <div className="flex items-center space-x-0.5">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={9}
                className={`${
                  i < Math.floor(stylist?.rating)
                    ? 'text-accent fill-current' :'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-[11px] text-muted-foreground">
            {stylist?.rating}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-1.5">
          <Button
            variant="outline"
            onClick={() => onViewDetails(stylist)}
            className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground text-[11px]"
            size="sm"
          >
            View Profile
          </Button>
          <Button
            variant="default"
            onClick={() => onBookAppointment(stylist)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-[11px]"
            size="sm"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylistCard;

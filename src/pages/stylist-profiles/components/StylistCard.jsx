import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylistCard = ({ stylist, onViewDetails, onBookAppointment }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-card rounded-lg shadow-luxury hover:shadow-luxury-hover transition-luxury-slow overflow-hidden group">
      {/* Profile Image */}
      <div className="relative h-48 sm:h-56 lg:h-64 xl:h-80 overflow-hidden bg-muted">
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
            <Icon name="User" size={48} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Experience Badge */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-accent text-accent-foreground px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
          {stylist?.experience}+ Years
        </div>
      </div>
      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Name and Title */}
        <div className="mb-3 sm:mb-4">
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-1">
            {stylist?.name}
          </h3>
          <p className="text-accent font-medium text-sm sm:text-base">{stylist?.title}</p>
        </div>

        {/* Specialties */}
        <div className="mb-3 sm:mb-4">
          <h4 className="text-xs sm:text-sm font-medium text-foreground mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {stylist?.specialties?.slice(0, 3)?.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 sm:px-3 sm:py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
            {stylist?.specialties?.length > 3 && (
              <span className="px-2 py-1 sm:px-3 sm:py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{stylist?.specialties?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bio Preview */}
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
          {stylist?.bio}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={`${
                  i < Math.floor(stylist?.rating)
                    ? 'text-accent fill-current' :'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs sm:text-sm text-muted-foreground">
            {stylist?.rating} ({stylist?.reviewCount} reviews)
          </span>
        </div>

        {/* Certifications */}
        {stylist?.certifications?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-accent" />
              <span className="text-sm text-foreground font-medium">
                {stylist?.certifications?.[0]}
              </span>
              {stylist?.certifications?.length > 1 && (
                <span className="text-xs text-muted-foreground">
                  +{stylist?.certifications?.length - 1} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onViewDetails(stylist)}
            className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            iconName="Eye"
            iconPosition="left"
          >
            View Profile
          </Button>
          <Button
            variant="default"
            onClick={() => onBookAppointment(stylist)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            iconName="Calendar"
            iconPosition="left"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylistCard;
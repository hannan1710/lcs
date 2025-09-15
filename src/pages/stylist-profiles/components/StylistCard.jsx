import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylistCard = ({ stylist, onViewDetails, onBookAppointment }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex h-full bg-card rounded-md shadow-sm hover:shadow-md transition-luxury-slow overflow-hidden group">
      {/* Profile Image */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 overflow-hidden bg-muted">
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
        <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground px-1 py-0.5 rounded-full text-[8px] font-medium">
          {stylist?.experience?.replace(' years', '')}+
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-2 min-w-0">
        {/* Name, Title, Specialties */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div>
            <h3 className="font-heading text-[9px] font-semibold text-foreground truncate">
              {stylist?.name}
            </h3>
            <p className="text-accent font-medium text-[8px] truncate">{stylist?.specialty}</p>
          </div>
          <div className="flex flex-wrap gap-0.5">
            {stylist?.services?.slice(0, 1)?.map((service, index) => (
              <span
                key={index}
                className="px-1 py-0.5 bg-secondary text-secondary-foreground text-[8px] rounded-full truncate"
              >
                {service}
              </span>
            ))}
            {stylist?.services?.length > 1 && (
              <span className="px-1 py-0.5 bg-muted text-muted-foreground text-[8px] rounded-full">
                +{stylist?.services?.length - 1}
              </span>
            )}
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center mb-1 mt-auto">
          <div className="flex items-center space-x-0.5">
            {[...Array(3)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={6}
                className={`${
                  i < Math.floor(stylist?.rating / 2)
                    ? 'text-accent fill-current' :'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-[8px] text-muted-foreground">
            {stylist?.rating}
          </span>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-1">
          <Button
            variant="outline"
            onClick={() => onViewDetails(stylist)}
            className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-[8px] py-0.5 px-1"
            size="sm"
          >
            View
          </Button>
          <Button
            variant="default"
            onClick={() => onBookAppointment(stylist)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-[8px] py-0.5 px-1"
            size="sm"
          >
            Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylistCard;
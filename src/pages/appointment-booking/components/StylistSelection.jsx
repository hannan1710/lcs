import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const StylistSelection = ({ stylists, selectedStylist, onStylistSelect }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Choose Your Stylist
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Select from our team of expert professionals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stylists?.map((stylist) => {
          const isSelected = selectedStylist?.id === stylist?.id;
          
          return (
            <div
              key={stylist?.id}
              onClick={() => onStylistSelect(stylist)}
              className={`bg-card rounded-lg border-2 cursor-pointer transition-luxury hover:shadow-luxury-hover ${
                isSelected 
                  ? 'border-accent shadow-luxury' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 sm:mb-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                      <Image
                        src={stylist?.avatar}
                        alt={stylist?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full p-0.5">
                        <Icon name="Check" size={10} />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-1">
                    {stylist?.name}
                  </h3>
                  
                  <p className="text-xs text-accent font-medium mb-1">
                    {stylist?.title}
                  </p>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {stylist?.bio}
                  </p>
                  
                  <div className="flex items-center space-x-0.5 mb-2">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={10}
                        className={i < Math.floor(stylist?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      {stylist?.rating}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {stylist?.specialties?.slice(0, 2)?.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StylistSelection;
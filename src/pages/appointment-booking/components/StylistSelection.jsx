import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const StylistSelection = ({ stylists, selectedStylist, onStylistSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Choose Your Stylist
        </h2>
        <p className="text-muted-foreground">
          Select from our team of expert professionals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <Image
                        src={stylist?.avatar}
                        alt={stylist?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full p-1">
                        <Icon name="Check" size={14} />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                    {stylist?.name}
                  </h3>
                  
                  <p className="text-sm text-accent font-medium mb-2">
                    {stylist?.title}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {stylist?.bio}
                  </p>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(stylist?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({stylist?.rating})
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
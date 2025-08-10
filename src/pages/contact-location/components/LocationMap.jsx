import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = () => {
  const nearbyLandmarks = [
    { name: 'Central Park', distance: '0.3 miles', icon: 'Trees' },
    { name: 'Metropolitan Museum', distance: '0.5 miles', icon: 'Building' },
    { name: 'Madison Ave Shopping', distance: '0.1 miles', icon: 'ShoppingBag' },
    { name: 'Subway Station (6 Train)', distance: '0.2 miles', icon: 'Train' }
  ];

  const parkingOptions = [
    { name: 'Valet Parking Available', description: 'Complimentary for appointments over $200' },
    { name: 'Street Parking', description: 'Metered parking available on Madison Ave' },
    { name: 'Parking Garage', description: '1255 Madison Ave - 2 blocks away' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-luxury border border-border overflow-hidden">
      {/* Map Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
              Find Our Salon
            </h2>
            <p className="text-muted-foreground">
              Located in the heart of Manhattan's Upper East Side
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">Prime Location</span>
          </div>
        </div>
      </div>
      {/* Interactive Map */}
      <div className="relative h-80 lg:h-96">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="La Coiffure Salon Location"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7829,-73.9654&z=16&output=embed"
          className="border-0"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => window.open('https://maps.google.com/?q=1247+Madison+Avenue+New+York+NY+10128', '_blank')}
            className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-luxury hover:shadow-luxury-hover transition-luxury flex items-center space-x-2"
          >
            <Icon name="Navigation" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Directions</span>
          </button>
          
          <button
            onClick={() => window.open('https://maps.google.com/?q=1247+Madison+Avenue+New+York+NY+10128&layer=t', '_blank')}
            className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-luxury hover:shadow-luxury-hover transition-luxury flex items-center space-x-2"
          >
            <Icon name="Satellite" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Satellite</span>
          </button>
        </div>
      </div>
      {/* Location Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nearby Landmarks */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
              <Icon name="MapPin" size={20} className="text-accent" />
              <span>Nearby Landmarks</span>
            </h3>
            <div className="space-y-3">
              {nearbyLandmarks?.map((landmark, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name={landmark?.icon} size={16} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{landmark?.name}</p>
                    <p className="text-muted-foreground text-xs">{landmark?.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parking Information */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Car" size={20} className="text-accent" />
              <span>Parking Options</span>
            </h3>
            <div className="space-y-3">
              {parkingOptions?.map((option, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground text-sm mb-1">{option?.name}</p>
                  <p className="text-muted-foreground text-xs">{option?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Train" size={20} className="text-accent" />
            <span>Public Transportation</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
              <Icon name="Train" size={20} className="text-success" />
              <div>
                <p className="font-medium text-foreground text-sm">Subway</p>
                <p className="text-muted-foreground text-xs">6 Train - 96th St Station</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <Icon name="Bus" size={20} className="text-warning" />
              <div>
                <p className="font-medium text-foreground text-sm">Bus</p>
                <p className="text-muted-foreground text-xs">M1, M2, M3, M4 Lines</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <Icon name="Car" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground text-sm">Taxi/Uber</p>
                <p className="text-muted-foreground text-xs">Easy pickup location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
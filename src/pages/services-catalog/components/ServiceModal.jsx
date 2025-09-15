import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceModal = ({ service, isOpen, onClose, onBookNow }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg shadow-luxury-hover max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl">{service?.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-luxury"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                {/* Single Thumbnail Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={service?.image}
                    alt={service?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Service Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{service?.duration} min</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pricing:</span>
                      <p className="font-medium">Contact for pricing</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <p className="font-medium capitalize">{service?.category}</p>
                    </div>
                    {service?.tags && (
                      <div>
                        <span className="text-muted-foreground">Tags:</span>
                        <p className="font-medium">{service?.tags}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {service?.beforeAfter && (
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-3">Before & After</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {service?.beforeAfter?.map((item, index) => (
                        <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={item?.image}
                            alt={`Before and after ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            {item?.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service?.fullDescription}
                </p>
              </div>
              
              
              {/* <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Pricing Tiers</h3>
                <div className="space-y-3">
                  {service?.pricingTiers?.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{tier?.name}</p>
                        <p className="text-sm text-muted-foreground">{tier?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              
              
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3"> Instructions</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    {service?.preparation?.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                

                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-border hover:border-accent hover:text-accent"
              >
                Close
              </Button>
              <Button
                variant="default"
                onClick={() => onBookNow(service)}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                iconName="Calendar"
                iconPosition="left"
              >
                Book This Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
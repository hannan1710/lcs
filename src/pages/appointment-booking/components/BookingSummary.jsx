import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ 
  selectedServices, 
  selectedStylist, 
  selectedDate, 
  selectedTime, 
  formData,
  onConfirm,
  onEdit,
  isLoading 
}) => {
  const calculateTotal = () => {
    return 0; // No pricing for services
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalDuration = selectedServices?.reduce((total, service) => {
    const minutes = parseInt(service?.duration?.replace(' min', ''));
    return total + minutes;
  }, 0);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${mins}min`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Booking Summary
        </h2>
        <p className="text-muted-foreground">
          Please review your appointment details
        </p>
      </div>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Services */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Selected Services
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit('services')}
              iconName="Edit2"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          
          <div className="space-y-3">
            {selectedServices?.map((service) => (
              <div key={service?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={service?.image}
                      alt={service?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{service?.name}</p>
                    <p className="text-sm text-muted-foreground">{service?.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stylist */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Your Stylist
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit('stylist')}
              iconName="Edit2"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={selectedStylist?.avatar}
                alt={selectedStylist?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">{selectedStylist?.name}</p>
              <p className="text-sm text-accent">{selectedStylist?.title}</p>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={i < Math.floor(selectedStylist?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({selectedStylist?.rating})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Appointment Details
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit('datetime')}
              iconName="Edit2"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{formatDate(selectedDate)}</p>
                <p className="text-sm text-muted-foreground">Date</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{selectedTime}</p>
                <p className="text-sm text-muted-foreground">
                  Estimated duration: {formatDuration(totalDuration)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Contact Information
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit('information')}
              iconName="Edit2"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-foreground">
              {formData?.firstName} {formData?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{formData?.email}</p>
            <p className="text-sm text-muted-foreground">{formData?.phone}</p>
            {formData?.notes && (
              <p className="text-sm text-muted-foreground mt-2">
                <span className="font-medium">Notes:</span> {formData?.notes}
              </p>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="p-6 bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-heading font-semibold text-foreground">
                Total Amount
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedServices?.length} service{selectedServices?.length > 1 ? 's' : ''}
              </p>
            </div>
            <p className="text-2xl font-heading font-bold text-accent">
              ${calculateTotal()}
            </p>
          </div>
        </div>
      </div>
      {/* Policies */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Booking Policies
        </h3>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-medium text-foreground">Cancellation:</span> 
              Free cancellation up to 24 hours before your appointment
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="CreditCard" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-medium text-foreground">Payment:</span> 
              Payment is due at the time of service. We accept all major credit cards
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-medium text-foreground">Location:</span> 
              123 Luxury Avenue, Beverly Hills, CA 90210
            </p>
          </div>
        </div>
      </div>
      {/* Confirm Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onEdit('services')}
          className="flex-1"
        >
          Go Back
        </Button>
        
        <Button
          variant="default"
          size="lg"
          onClick={onConfirm}
          loading={isLoading}
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
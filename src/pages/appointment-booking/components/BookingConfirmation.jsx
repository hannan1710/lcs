import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, onNewBooking, onGoHome }) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateBookingId = () => {
    return `LC${Date.now()?.toString()?.slice(-6)}`;
  };

  const bookingId = generateBookingId();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Booking Confirmed!
        </h2>
        
        <p className="text-muted-foreground">
          Your appointment has been successfully scheduled
        </p>
        
        <div className="mt-4 p-3 bg-accent/10 rounded-lg inline-block">
          <p className="text-sm text-muted-foreground">Booking ID</p>
          <p className="font-mono font-semibold text-accent text-lg">{bookingId}</p>
        </div>
      </div>
      {/* Booking Details Card */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="bg-accent/5 p-6 border-b border-border">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Appointment Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="text-accent" />
                <div>
                  <p className="font-medium text-foreground">
                    {formatDate(bookingData?.selectedDate)}
                  </p>
                  <p className="text-sm text-muted-foreground">Date</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-accent" />
                <div>
                  <p className="font-medium text-foreground">{bookingData?.selectedTime}</p>
                  <p className="text-sm text-muted-foreground">Time</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={20} className="text-accent" />
                <div>
                  <p className="font-medium text-foreground">La Coiffure Salon</p>
                  <p className="text-sm text-muted-foreground">
                    123 Luxury Avenue, Beverly Hills, CA 90210
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={20} className="text-accent" />
                <div>
                  <p className="font-medium text-foreground">(555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Salon Phone</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="p-6 border-b border-border">
          <h4 className="font-semibold text-foreground mb-3">Services Booked</h4>
          <div className="space-y-3">
            {bookingData?.selectedServices?.map((service) => (
              <div key={service?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
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
          <h4 className="font-semibold text-foreground mb-3">Your Stylist</h4>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={bookingData?.selectedStylist?.avatar}
                alt={bookingData?.selectedStylist?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{bookingData?.selectedStylist?.name}</p>
              <p className="text-sm text-accent">{bookingData?.selectedStylist?.title}</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="p-6 bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-foreground">Total Amount</p>
            <p className="text-xl font-heading font-bold text-accent">
              $0
            </p>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          What's Next?
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-accent">1</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Confirmation Email</p>
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email with all appointment details
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-accent">2</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Appointment Reminder</p>
              <p className="text-sm text-muted-foreground">
                We'll send you a reminder 24 hours before your appointment
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-accent">3</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Preparation Tips</p>
              <p className="text-sm text-muted-foreground">
                Arrive 15 minutes early and come with clean, dry hair
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onNewBooking}
          iconName="Plus"
          iconPosition="left"
          className="flex-1"
        >
          Book Another
        </Button>
        
        <Button
          variant="default"
          size="lg"
          onClick={onGoHome}
          iconName="Home"
          iconPosition="left"
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Back to Home
        </Button>
      </div>
      {/* Calendar Integration */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Add this appointment to your calendar
        </p>
        
        <div className="flex justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
          >
            Google Calendar
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
          >
            Outlook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
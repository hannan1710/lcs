import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SingleStepBookingForm from './components/SingleStepBookingForm';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleBookingSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Make actual API call to create appointment
      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBookingData({
          ...formData,
          id: result.appointment.id,
          notificationsSent: result.notificationsSent,
          emailSent: result.emailSent,
          smsSent: result.smsSent
        });
        setIsConfirmed(true);
      } else {
        console.error('Booking failed:', result.error);
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewBooking = () => {
    setBookingData(null);
    setIsConfirmed(false);
  };

  const handleGoHome = () => {
    navigate('/homepage');
  };

  if (isConfirmed) {
    // Get branch contact info
    const getBranchInfo = (branch) => {
      const branches = {
        powai: {
          name: 'Powai Branch',
          phone: '+91 74000 68615',
          whatsapp: '+91 74000 68615'
        },
        thane: {
          name: 'Thane Branch', 
          phone: '+91 99670 02481',
          whatsapp: '+91 99670 02481'
        }
      };
      return branches[branch] || branches.powai;
    };

    const branchInfo = getBranchInfo(bookingData?.branch);

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={40} className="text-green-600 dark:text-green-400" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Booking Submitted Successfully!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Thank you for choosing La Coiffure Salon
                </p>
              </div>

              {/* Confirmation Details */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={bookingData?.confirmationMethod === 'whatsapp' ? "MessageCircle" : "Phone"} 
                    size={24} 
                    className={bookingData?.confirmationMethod === 'whatsapp' ? "text-green-500" : "text-blue-500"} 
                  />
                  <div className="text-left">
                    <p className="text-lg font-semibold text-foreground">
                      {bookingData?.confirmationMethod === 'whatsapp' ? 'WhatsApp' : 'Phone Call'}
                    </p>
                    <p className="text-muted-foreground">
                      {bookingData?.confirmationMethod === 'whatsapp' ? 
                        `You will receive a message from our side to ${bookingData?.bookingType === 'consultation' ? 'consult you' : 'confirm your appointment'}` :
                        `You will receive a call from our side to ${bookingData?.bookingType === 'consultation' ? 'consult you' : 'confirm your appointment'}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleNewBooking}
                  className="flex-1"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Book Another Appointment
                </Button>
                
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleGoHome}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Icon name="Home" size={16} className="mr-2" />
                  Go to Homepage
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Book Your Appointment
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
  Please provide your details, and our team will contact you via WhatsApp, email, or phone call to confirm your appointment.
</p>

          </div>

          {/* Single Step Booking Form */}
          <SingleStepBookingForm
            onSubmit={handleBookingSubmit}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default AppointmentBooking;
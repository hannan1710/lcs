import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SingleStepBookingForm from './components/SingleStepBookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Icon from '../../components/AppIcon';

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
          whatsappSent: result.whatsappSent
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
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <BookingConfirmation
              bookingData={bookingData}
              onNewBooking={handleNewBooking}
              onGoHome={handleGoHome}
            />
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience luxury hair care with our expert stylists. Complete your booking in one simple step.
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
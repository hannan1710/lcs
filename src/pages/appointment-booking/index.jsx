import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ServiceSelection from './components/ServiceSelection';
import StylistSelection from './components/StylistSelection';
import DateTimeSelection from './components/DateTimeSelection';
import ClientInformation from './components/ClientInformation';
import BookingSummary from './components/BookingSummary';
import BookingConfirmation from './components/BookingConfirmation';
import ProgressIndicator from './components/ProgressIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    notes: '',
    emailReminders: true,
    smsReminders: true,
    newsletter: false,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  // Mock data
  const services = [
    {
      id: 1,
      name: "Signature Cut & Style",
      description: "Premium haircut with personalized styling consultation and luxury finish",
      duration: "90 min",
      price: 150,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Color Transformation",
      description: "Full color service including consultation, application, and professional styling",
      duration: "180 min",
      price: 280,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Luxury Highlights",
      description: "Premium highlighting technique with toner and glossing treatment",
      duration: "150 min",
      price: 220,
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Keratin Treatment",
      description: "Smoothing treatment for frizz-free, manageable hair with lasting results",
      duration: "120 min",
      price: 300,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Bridal Package",
      description: "Complete bridal hair service including trial, styling, and touch-ups",
      duration: "240 min",
      price: 450,
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Deep Conditioning",
      description: "Intensive hair treatment with premium products for ultimate hair health",
      duration: "60 min",
      price: 80,
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop"
    }
  ];

  const stylists = [
    {
      id: 1,
      name: "Isabella Martinez",
      title: "Master Stylist & Color Specialist",
      bio: "15+ years of experience in luxury hair design with expertise in color transformations and cutting-edge techniques.",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      specialties: ["Color", "Highlights", "Balayage", "Cuts"]
    },
    {
      id: 2,
      name: "Alexander Chen",
      title: "Senior Stylist & Texture Expert",
      bio: "Specializing in precision cuts and texture work with a passion for creating personalized looks for each client.",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      specialties: ["Cuts", "Styling", "Texture", "Men\'s Grooming"]
    },
    {
      id: 3,
      name: "Sophia Williams",
      title: "Bridal & Event Specialist",
      bio: "Expert in bridal and special occasion styling with a keen eye for elegant, timeless looks.",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      specialties: ["Bridal", "Updos", "Special Events", "Extensions"]
    },
    {
      id: 4,
      name: "Marcus Johnson",
      title: "Creative Director",
      bio: "Award-winning stylist with expertise in avant-garde techniques and luxury hair transformations.",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      specialties: ["Creative Cuts", "Color", "Styling", "Consultations"]
    }
  ];

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => {
      const exists = prev?.find(s => s?.id === service?.id);
      if (exists) {
        return prev?.filter(s => s?.id !== service?.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    // Clear errors for the field being updated
    const updatedField = Object.keys(newFormData)?.find(
      key => newFormData?.[key] !== formData?.[key]
    );
    if (updatedField && errors?.[updatedField]) {
      setErrors(prev => ({ ...prev, [updatedField]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (selectedServices?.length === 0) {
          newErrors.services = 'Please select at least one service';
          return false;
        }
        break;
      case 2:
        if (!selectedStylist) {
          newErrors.stylist = 'Please select a stylist';
          return false;
        }
        break;
      case 3:
        if (!selectedDate) {
          newErrors.date = 'Please select a date';
          return false;
        }
        if (!selectedTime) {
          newErrors.time = 'Please select a time';
          return false;
        }
        break;
      case 4:
        if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData?.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/?.test(formData?.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
        if (!formData?.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleEdit = (section) => {
    switch (section) {
      case 'services':
        setCurrentStep(1);
        break;
      case 'stylist':
        setCurrentStep(2);
        break;
      case 'datetime':
        setCurrentStep(3);
        break;
      case 'information':
        setCurrentStep(4);
        break;
    }
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsConfirmed(true);
  };

  const handleNewBooking = () => {
    // Reset all state
    setCurrentStep(1);
    setSelectedServices([]);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      notes: '',
      emailReminders: true,
      smsReminders: true,
      newsletter: false,
      agreeToTerms: false
    });
    setErrors({});
    setIsConfirmed(false);
  };

  const handleGoHome = () => {
    navigate('/homepage');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedServices?.length > 0;
      case 2:
        return selectedStylist !== null;
      case 3:
        return selectedDate && selectedTime;
      case 4:
        return formData?.firstName && formData?.lastName && formData?.email && 
               formData?.phone && formData?.agreeToTerms;
      default:
        return true;
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <BookingConfirmation
              bookingData={{
                selectedServices,
                selectedStylist,
                selectedDate,
                selectedTime,
                formData
              }}
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
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience luxury hair care with our expert stylists. Follow the simple steps below to schedule your perfect appointment.
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={5} />

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && (
              <ServiceSelection
                services={services}
                selectedServices={selectedServices}
                onServiceToggle={handleServiceToggle}
              />
            )}

            {currentStep === 2 && (
              <StylistSelection
                stylists={stylists}
                selectedStylist={selectedStylist}
                onStylistSelect={handleStylistSelect}
              />
            )}

            {currentStep === 3 && (
              <DateTimeSelection
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={handleDateSelect}
                onTimeSelect={handleTimeSelect}
              />
            )}

            {currentStep === 4 && (
              <ClientInformation
                formData={formData}
                onFormChange={handleFormChange}
                errors={errors}
              />
            )}

            {currentStep === 5 && (
              <BookingSummary
                selectedServices={selectedServices}
                selectedStylist={selectedStylist}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                formData={formData}
                onConfirm={handleConfirmBooking}
                onEdit={handleEdit}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
                className="sm:w-auto"
              >
                Previous
              </Button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of 5
                </span>
                
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  iconName="ChevronRight"
                  iconPosition="right"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {currentStep === 4 ? 'Review Booking' : 'Next'}
                </Button>
              </div>
            </div>
          )}

          {/* Error Messages */}
          {Object.keys(errors)?.length > 0 && (
            <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertCircle" size={20} className="text-error" />
                <p className="font-medium text-error">Please fix the following errors:</p>
              </div>
              <ul className="text-sm text-error space-y-1">
                {Object.values(errors)?.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppointmentBooking;
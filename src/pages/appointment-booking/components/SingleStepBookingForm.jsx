import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SingleStepBookingForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    branch: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    selectedDate: null,
    selectedTime: '',
    bookingType: 'appointment',
    confirmationMethod: 'whatsapp'
  });

  const [errors, setErrors] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());



  const timeSlots = [
    
      "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM","12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
      "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM","4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
      "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM","8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isSelected = formData.selectedDate && date.toDateString() === formData.selectedDate.toDateString();
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isSelected,
        isAvailable: isCurrentMonth && !isPast
      });
    }
    
    return days;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };




  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.branch) newErrors.branch = 'Please select a branch';
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
   
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.selectedDate) newErrors.selectedDate = 'Please select a date';
    if (!formData.selectedTime) newErrors.selectedTime = 'Please select a time';
    if (!formData.bookingType) newErrors.bookingType = 'Please select booking type';
    if (!formData.confirmationMethod) newErrors.confirmationMethod = 'Please select confirmation method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
    {/* Branch Selection */}
  <div className="bg-card rounded-lg border border-border p-6">
    <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
      Select Branch
    </h3>
    {/* Change grid-cols-1 to grid-cols-2 */}
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => handleInputChange('branch', 'powai')}
        className={`p-4 rounded-lg border-2 transition-luxury hover:shadow-luxury-hover ${
          formData.branch === 'powai'
            ? 'border-accent bg-accent/10 shadow-luxury'
            : 'border-border hover:border-accent/50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={24} className="text-accent" />
          <div className="text-left">
            <h4 className="font-semibold text-foreground">Powai</h4>
            <p className="text-sm text-muted-foreground">Galleria </p>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => handleInputChange('branch', 'thane')}
        className={`p-4 rounded-lg border-2 transition-luxury hover:shadow-luxury-hover ${
          formData.branch === 'thane'
            ? 'border-accent bg-accent/10 shadow-luxury'
            : 'border-border hover:border-accent/50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={24} className="text-accent" />
          <div className="text-left">
            <h4 className="font-semibold text-foreground">Thane</h4>
            <p className="text-sm text-muted-foreground">Anand Nagar</p>
          </div>
        </div>
      </button>
    </div>
    {errors.branch && (
      <p className="text-error text-sm mt-2">{errors.branch}</p>
    )}
  </div>

      {/* Customer Details */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          Your Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label=" Name"
            type="text"
            placeholder="Enter your Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            error={errors.fullName}
            required
          />
          
       
          
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            error={errors.mobileNumber}
            required
          />
        </div>
      </div>


      {/* Date & Time Selection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
          Select Date & Time
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Calendar */}
          <div className="lg:max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                className="p-1.5 rounded-lg hover:bg-muted transition-luxury"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              
              <h4 className="font-heading font-semibold text-sm lg:text-base">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h4>
              
              <button
                type="button"
                onClick={() => navigateMonth(1)}
                className="p-1.5 rounded-lg hover:bg-muted transition-luxury"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => day.isAvailable && handleInputChange('selectedDate', day.date)}
                  disabled={!day.isAvailable}
                  className={`aspect-square flex items-center justify-center text-xs lg:text-sm rounded transition-luxury ${
                    day.isSelected
                      ? 'bg-accent text-accent-foreground'
                      : day.isToday
                      ? 'bg-accent/20 text-accent font-semibold'
                      : day.isAvailable
                      ? 'hover:bg-muted text-foreground'
                      : 'text-muted-foreground cursor-not-allowed'
                  } ${!day.isCurrentMonth ? 'opacity-30' : ''}`}
                >
                  {day.day}
                </button>
              ))}
            </div>
            {errors.selectedDate && (
              <p className="text-error text-sm mt-2">{errors.selectedDate}</p>
            )}
          </div>

          {/* Time Slots */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Available Times</h4>
            
            {formData.selectedDate ? (
              <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleInputChange('selectedTime', time)}
                    className={`p-3 text-sm rounded-lg border transition-luxury ${
                      formData.selectedTime === time
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-background border-border hover:border-accent/50 hover:bg-muted'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Icon name="Calendar" size={48} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Please select date to view available times
                </p>
              </div>
            )}
            {errors.selectedTime && (
              <p className="text-error text-sm mt-2">{errors.selectedTime}</p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Type */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          Type of Booking
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleInputChange('bookingType', 'appointment')}
            className={`p-4 rounded-lg border-2 transition-luxury hover:shadow-luxury-hover ${
              formData.bookingType === 'appointment'
                ? 'border-accent bg-accent/10 shadow-luxury'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={24} className="text-accent" />
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Appointment</h4>
                <p className="text-sm text-muted-foreground">Regular service booking</p>
              </div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => handleInputChange('bookingType', 'consultation')}
            className={`p-4 rounded-lg border-2 transition-luxury hover:shadow-luxury-hover ${
              formData.bookingType === 'consultation'
                ? 'border-accent bg-accent/10 shadow-luxury'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name="MessageCircle" size={24} className="text-accent" />
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Consultation</h4>
                <p className="text-sm text-muted-foreground">Discuss your needs</p>
              </div>
            </div>
          </button>
        </div>
        {errors.bookingType && (
          <p className="text-error text-sm mt-2">{errors.bookingType}</p>
        )}
      </div>

      {/* Confirmation Method */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          How would you like us to confirm your appointment?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleInputChange('confirmationMethod', 'whatsapp')}
            className={`p-4 rounded-lg border-2 transition-luxury hover:shadow-luxury-hover ${
              formData.confirmationMethod === 'whatsapp'
                ? 'border-accent bg-accent/10 shadow-luxury'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name="MessageCircle" size={24} className="text-green-500" />
              <div className="text-left">
                <h4 className="font-semibold text-foreground">WhatsApp</h4>
                <p className="text-sm text-muted-foreground">Instant confirmation via WhatsApp</p>
              </div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => handleInputChange('confirmationMethod', 'call')}
            className={`p-4 rounded-lg border-2 transition-luxury hover:shadow-luxury-hover ${
              formData.confirmationMethod === 'call'
                ? 'border-accent bg-accent/10 shadow-luxury'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={24} className="text-blue-500" />
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Phone Call</h4>
                <p className="text-sm text-muted-foreground">We'll call you to confirm</p>
              </div>
            </div>
          </button>
        </div>
        {errors.confirmationMethod && (
          <p className="text-error text-sm mt-2">{errors.confirmationMethod}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3"
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              Booking...
            </>
          ) : (
            <>
              <Icon name="Calendar" size={20} className="mr-2" />
              Book Appointment
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SingleStepBookingForm;

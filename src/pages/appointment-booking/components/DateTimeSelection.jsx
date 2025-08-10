import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DateTimeSelection = ({ selectedDate, selectedTime, onDateSelect, onTimeSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date?.setDate(startDate?.getDate() + i);
      
      const isCurrentMonth = date?.getMonth() === month;
      const isPast = date < today;
      const isToday = date?.getTime() === today?.getTime();
      const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();
      
      days?.push({
        date,
        day: date?.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isSelected,
        isAvailable: isCurrentMonth && !isPast
      });
    }
    
    return days;
  };

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Select Date & Time
        </h2>
        <p className="text-muted-foreground">
          Choose your preferred appointment slot
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg hover:bg-muted transition-luxury"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <h3 className="font-heading font-semibold text-lg">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </h3>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg hover:bg-muted transition-luxury"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays?.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays()?.map((day, index) => (
              <button
                key={index}
                onClick={() => day?.isAvailable && onDateSelect(day?.date)}
                disabled={!day?.isAvailable}
                className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-luxury ${
                  day?.isSelected
                    ? 'bg-accent text-accent-foreground'
                    : day?.isToday
                    ? 'bg-accent/20 text-accent font-semibold'
                    : day?.isAvailable
                    ? 'hover:bg-muted text-foreground'
                    : 'text-muted-foreground cursor-not-allowed'
                } ${!day?.isCurrentMonth ? 'opacity-30' : ''}`}
              >
                {day?.day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-4">
            Available Times
          </h3>
          
          {selectedDate ? (
            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {timeSlots?.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={`p-3 text-sm rounded-lg border transition-luxury ${
                    selectedTime === time
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
                Please select a date to view available times
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelection;
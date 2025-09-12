import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import services from '../../../data/services';

const SingleStepBookingForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    branch: '',
    fullName: '',
    mobileNumber: '',
    services: [],
    preferredStylists: [],
    selectedDate: null,
    selectedTime: '',
    bookingType: 'appointment'
  });

  const [errors, setErrors] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showServiceSearch, setShowServiceSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddMoreCategories, setShowAddMoreCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Branch-specific stylists data
  const stylistsByBranch = {
    powai: [
      { id: 1, name: "Isabella Martinez", title: "Master Stylist & Color Specialist", branch: "powai", specialties: ["Color", "Highlights", "Balayage"] },
      { id: 2, name: "Alexander Chen", title: "Senior Stylist & Texture Expert", branch: "powai", specialties: ["Cuts", "Styling", "Texture"] },
      { id: 3, name: "Sophia Williams", title: "Bridal & Event Specialist", branch: "powai", specialties: ["Bridal", "Updos", "Special Events"] }
    ],
    thane: [
      { id: 4, name: "Marcus Johnson", title: "Creative Director", branch: "thane", specialties: ["Creative Cuts", "Color", "Styling"] },
      { id: 5, name: "Emma Davis", title: "Senior Colorist", branch: "thane", specialties: ["Color", "Highlights", "Balayage"] },
      { id: 6, name: "James Wilson", title: "Master Barber", branch: "thane", specialties: ["Men's Cuts", "Beard Styling", "Grooming"] }
    ]
  };

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
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

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const exists = prev.services.find(s => s.id === service.id);
      if (exists) {
        return {
          ...prev,
          services: prev.services.filter(s => s.id !== service.id)
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, service]
        };
      }
    });
  };


  const handleServiceSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      const results = services.filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchServiceSelect = (service) => {
    setFormData(prev => {
      const exists = prev.services.find(s => s.id === service.id);
      if (!exists) {
        return {
          ...prev,
          services: [...prev.services, service]
        };
      }
      return prev;
    });
    setSearchQuery('');
    setSearchResults([]);
    setShowServiceSearch(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowAddMoreCategories(false);
  };

  const handleAddMoreCategories = () => {
    setShowAddMoreCategories(true);
    setSelectedCategory('');
  };

  const handleFinishCategorySelection = () => {
    setSelectedCategory('');
    setShowAddMoreCategories(false);
  };

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    const category = service.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  // Get available categories (excluding already selected ones)
  const getAvailableCategories = () => {
    const selectedCategories = new Set();
    formData.services.forEach(service => {
      selectedCategories.add(service.category);
    });
    
    return Object.keys(groupedServices).filter(category => 
      !selectedCategories.has(category) || category === selectedCategory
    );
  };

  // Get services from selected category
  const getServicesFromCategory = (category) => {
    return groupedServices[category] || [];
  };

  // Check if user has services from multiple categories
  const hasMultipleCategories = () => {
    const categories = new Set(formData.services.map(service => service.category));
    return categories.size > 1;
  };

  const handleStylistToggle = (stylist) => {
    setFormData(prev => {
      if (stylist === 'no-preference') {
        // If "No Preference" is selected, clear all other selections
        return {
          ...prev,
          preferredStylists: ['no-preference']
        };
      } else {
        const exists = prev.preferredStylists.find(s => s.id === stylist.id);
        if (exists) {
          // Remove the stylist
          return {
            ...prev,
            preferredStylists: prev.preferredStylists.filter(s => s.id !== stylist.id)
          };
        } else {
          // Add the stylist and remove "no-preference" if it exists
          return {
            ...prev,
            preferredStylists: [
              ...prev.preferredStylists.filter(s => s !== 'no-preference'),
              stylist
            ]
          };
        }
      }
    });
  };

  const getAvailableStylists = () => {
    if (!formData.branch) return [];
    return stylistsByBranch[formData.branch] || [];
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.branch) newErrors.branch = 'Please select a branch';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }
    if (!formData.selectedDate) newErrors.selectedDate = 'Please select a date';
    if (!formData.selectedTime) newErrors.selectedTime = 'Please select a time';
    if (!formData.bookingType) newErrors.bookingType = 'Please select booking type';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <p className="text-sm text-muted-foreground">Powai Lake, Mumbai</p>
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
                <p className="text-sm text-muted-foreground">Thane West, Mumbai</p>
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
          Customer Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
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

      {/* Service Selection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          Service Selection
        </h3>
        
        <div className="space-y-6">
          {/* Step 1: Category Selection */}
          {!selectedCategory && !showAddMoreCategories && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">Step 1: Choose Service Category</h4>
                <p className="text-sm text-muted-foreground">Select the main category of services you're interested in</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(groupedServices).map((category) => {
                  const categoryServices = groupedServices[category];
                  const isSelected = formData.services.some(service => service.category === category);
                  
                  return (
                    <div
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-luxury hover:shadow-luxury-hover ${
                        isSelected
                          ? 'border-accent bg-accent/10 shadow-luxury'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="text-center">
                        <h5 className="font-semibold text-foreground capitalize mb-2">
                          {category} Services
                        </h5>
                        <p className="text-xs text-muted-foreground mb-2">
                          {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''} available
                        </p>
                        {isSelected && (
                          <div className="text-xs text-accent font-medium">
                            {formData.services.filter(s => s.category === category).length} selected
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Service Search Option */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    id="serviceSearch"
                    checked={showServiceSearch}
                    onChange={(e) => setShowServiceSearch(e.target.checked)}
                    className="rounded border-border"
                  />
                  <label htmlFor="serviceSearch" className="text-sm font-medium text-foreground">
                    Or search for a specific service
                  </label>
                </div>

                {showServiceSearch && (
                  <div className="space-y-3">
                    <Input
                      label="Search Services"
                      type="text"
                      placeholder="Type to search for services..."
                      value={searchQuery}
                      onChange={(e) => handleServiceSearch(e.target.value)}
                    />
                    
                    {searchResults.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Search Results:</p>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {searchResults.map((service) => {
                            const isSelected = formData.services.some(s => s.id === service.id);
                            
                            return (
                              <div
                                key={service.id}
                                onClick={() => !isSelected && handleSearchServiceSelect(service)}
                                className={`p-3 rounded-lg border cursor-pointer transition-luxury ${
                                  isSelected
                                    ? 'border-accent bg-accent/10 cursor-not-allowed opacity-60'
                                    : 'border-border hover:border-accent/50 hover:bg-muted'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h6 className="font-semibold text-foreground text-sm">
                                      {service.name}
                                    </h6>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {service.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-xs text-muted-foreground capitalize">
                                        {service.category} • {service.duration}
                                      </span>
                                      <span className="text-sm font-semibold text-accent">
                                        ${service.price}
                                      </span>
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center ml-3">
                                      <Icon name="Check" size={12} color="var(--color-accent-foreground)" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {searchQuery.length > 2 && searchResults.length === 0 && (
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">
                          No services found matching "{searchQuery}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Service Selection from Category */}
          {selectedCategory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground capitalize">
                    {selectedCategory} Services
                  </h4>
                  <p className="text-sm text-muted-foreground">Select the services you want from this category</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory('')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Categories
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {getServicesFromCategory(selectedCategory).map((service) => {
                  const isSelected = formData.services.some(s => s.id === service.id);
                  
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-luxury hover:shadow-luxury-hover ${
                        isSelected 
                          ? 'border-accent bg-accent/10 shadow-luxury' 
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-foreground text-sm">
                            {service.name}
                          </h5>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {service.duration}
                            </span>
                            <span className="text-sm font-semibold text-accent">
                              ${service.price}
                            </span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                          isSelected 
                            ? 'bg-accent border-accent' 
                            : 'border-muted-foreground'
                        }`}>
                          {isSelected && (
                            <Icon name="Check" size={12} color="var(--color-accent-foreground)" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={handleFinishCategorySelection}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Icon name="Check" size={16} className="mr-2" />
                  Done with {selectedCategory}
                </Button>
                
                {getAvailableCategories().length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMoreCategories}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Services from Another Category
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Add More Categories */}
          {showAddMoreCategories && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Add More Categories</h4>
                  <p className="text-sm text-muted-foreground">Select another category to add more services</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleFinishCategorySelection}
                  iconName="X"
                >
                  Finish Selection
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {getAvailableCategories().map((category) => (
                  <div
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="p-4 rounded-lg border-2 border-border cursor-pointer transition-luxury hover:border-accent/50 hover:shadow-luxury-hover"
                  >
                    <div className="text-center">
                      <h5 className="font-semibold text-foreground capitalize mb-2">
                        {category} Services
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {groupedServices[category].length} service{groupedServices[category].length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Services Summary */}
          {formData.services.length > 0 && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-foreground">Selected Services</h5>
                {formData.services.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMoreCategories}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add More
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                {Object.keys(groupedServices).map(category => {
                  const categoryServices = formData.services.filter(service => service.category === category);
                  if (categoryServices.length === 0) return null;
                  
                  return (
                    <div key={category} className="border-l-2 border-accent pl-3">
                      <h6 className="text-sm font-medium text-foreground capitalize mb-1">
                        {category} Services
                      </h6>
                      <div className="space-y-1">
                        {categoryServices.map(service => (
                          <div key={service.id} className="flex items-center justify-between text-sm">
                            <span className="text-foreground">{service.name}</span>
                            <span className="text-accent font-semibold">${service.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
              </div>
            </div>
          )}

          {errors.services && (
            <p className="text-error text-sm">{errors.services}</p>
          )}
        </div>
      </div>

      {/* Preferred Stylists */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          Preferred Stylists
        </h3>
        
        <div className="space-y-4">
          {!formData.branch ? (
            <div className="p-4 bg-muted rounded-lg text-center">
              <Icon name="Info" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Please select a branch first to view available stylists
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Instructions */}
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> You can select multiple stylists or choose "No Preference" to let us assign the best available stylist.
                </p>
              </div>

              {/* No Preference Option */}
              <div
                onClick={() => handleStylistToggle('no-preference')}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-luxury hover:shadow-luxury-hover ${
                  formData.preferredStylists.includes('no-preference')
                    ? 'border-accent bg-accent/10 shadow-luxury'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.preferredStylists.includes('no-preference')
                      ? 'bg-accent border-accent'
                      : 'border-muted-foreground'
                  }`}>
                    {formData.preferredStylists.includes('no-preference') && (
                      <Icon name="Check" size={12} color="var(--color-accent-foreground)" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">No Preference</h4>
                    <p className="text-sm text-muted-foreground">Let us assign the best available stylist</p>
                  </div>
                </div>
              </div>

              {/* Available Stylists */}
              {getAvailableStylists().map(stylist => {
                const isSelected = formData.preferredStylists.some(s => s.id === stylist.id);
                
                return (
                  <div
                    key={stylist.id}
                    onClick={() => handleStylistToggle(stylist)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-luxury hover:shadow-luxury-hover ${
                      isSelected
                        ? 'border-accent bg-accent/10 shadow-luxury'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                        isSelected
                          ? 'bg-accent border-accent'
                          : 'border-muted-foreground'
                      }`}>
                        {isSelected && (
                          <Icon name="Check" size={12} color="var(--color-accent-foreground)" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{stylist.name}</h4>
                        <p className="text-sm text-accent font-medium mb-1">{stylist.title}</p>
                        <div className="flex flex-wrap gap-1">
                          {stylist.specialties.map((specialty, index) => (
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

              {/* Selected Stylists Summary */}
              {formData.preferredStylists.length > 0 && (
                <div className="bg-muted rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">Selected Stylists:</h5>
                  <div className="space-y-1">
                    {formData.preferredStylists.map((stylist, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">
                          {stylist === 'no-preference' ? 'No Preference' : stylist.name}
                        </span>
                        {stylist !== 'no-preference' && (
                          <span className="text-muted-foreground text-xs">
                            {stylist.title}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
          Date & Time
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
                  Please select a date to view available times
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

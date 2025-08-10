import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    serviceInterest: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    'Hair Cut & Styling',
    'Hair Coloring',
    'Bridal Services',
    'Hair Extensions',
    'Keratin Treatment',
    'Consultation',
    'Other Services'
  ];

  const contactMethods = [
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'phone', label: 'Phone Call', icon: 'Phone' },
    { value: 'text', label: 'Text Message', icon: 'MessageSquare' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData?.message?.trim()) {
      newErrors.message = 'Please tell us how we can help you';
    } else if (formData?.message?.trim()?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        contactMethod: 'email',
        serviceInterest: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-lg shadow-luxury border border-border p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground mb-6">
          We've received your inquiry and will get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-luxury border border-border">
      {/* Form Header */}
      <div className="p-6 border-b border-border">
        <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
          Get In Touch
        </h2>
        <p className="text-muted-foreground">
          Have questions about our services? We'd love to hear from you.
        </p>
      </div>
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={handleInputChange}
            error={errors?.name}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={formData?.phone}
            onChange={handleInputChange}
            error={errors?.phone}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Service Interest
            </label>
            <select
              name="serviceInterest"
              value={formData?.serviceInterest}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-luxury"
            >
              <option value="">Select a service (optional)</option>
              {serviceOptions?.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {contactMethods?.map((method) => (
              <label
                key={method?.value}
                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-luxury ${
                  formData?.contactMethod === method?.value
                    ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method?.value}
                  checked={formData?.contactMethod === method?.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Icon 
                  name={method?.icon} 
                  size={20} 
                  className={formData?.contactMethod === method?.value ? 'text-accent' : 'text-muted-foreground'} 
                />
                <span className={`text-sm font-medium ${
                  formData?.contactMethod === method?.value ? 'text-accent' : 'text-foreground'
                }`}>
                  {method?.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message *
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your hair goals, preferred appointment times, or any questions you have..."
            value={formData?.message}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-luxury resize-none ${
              errors?.message ? 'border-error' : 'border-border'
            }`}
          />
          {errors?.message && (
            <p className="mt-1 text-sm text-error">{errors?.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="bg-accent text-accent-foreground hover:bg-accent/90 flex-1"
            iconName="Send"
            iconPosition="right"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => window.location.href = '/appointment-booking'}
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            iconName="Calendar"
            iconPosition="left"
          >
            Book Appointment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
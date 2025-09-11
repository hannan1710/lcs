import React from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ClientInformation = ({ formData, onFormChange, errors }) => {
  const handleInputChange = (field) => (e) => {
    onFormChange({
      ...formData,
      [field]: e?.target?.value
    });
  };

  const handleCheckboxChange = (field) => (e) => {
    onFormChange({
      ...formData,
      [field]: e?.target?.checked
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Your Information
        </h2>
        <p className="text-muted-foreground">
          Please provide your contact details
        </p>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={handleInputChange('firstName')}
            error={errors?.firstName}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={handleInputChange('lastName')}
            error={errors?.lastName}
            
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange('email')}
            error={errors?.email}
            
            className="md:col-span-2"
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData?.phone}
            onChange={handleInputChange('phone')}
            error={errors?.phone}
            required
          />

          <Input
            label="Date of Birth"
            type="date"
            value={formData?.dateOfBirth}
            onChange={handleInputChange('dateOfBirth')}
            error={errors?.dateOfBirth}
          />

          <div className="md:col-span-2">
            <Input
              label="Special Requests or Notes"
              type="text"
              placeholder="Any specific requirements or preferences..."
              value={formData?.notes}
              onChange={handleInputChange('notes')}
              description="Let us know about any allergies, preferences, or special requests"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4 border-t border-border pt-6">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Communication Preferences
          </h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Send appointment reminders via email"
              checked={formData?.emailReminders}
              onChange={handleCheckboxChange('emailReminders')}
            />
            
            <Checkbox
              label="Send appointment reminders via SMS"
              checked={formData?.smsReminders}
              onChange={handleCheckboxChange('smsReminders')}
            />
            
            <Checkbox
              label="Subscribe to our newsletter for exclusive offers"
              checked={formData?.newsletter}
              onChange={handleCheckboxChange('newsletter')}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <Checkbox
            label="I agree to the terms and conditions and privacy policy"
            checked={formData?.agreeToTerms}
            onChange={handleCheckboxChange('agreeToTerms')}
            error={errors?.agreeToTerms}
            required
            description="By checking this box, you agree to our service terms and privacy policy"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInformation;
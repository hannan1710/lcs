import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ 
  formData,
  onConfirm,
  onEdit,
  isLoading 
}) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Branch contact information
  const getBranchInfo = (branch) => {
    const branches = {
      powai: {
        name: 'Powai Branch',
        address: 'Galleria Mall, Powai, Mumbai',
        phone: '+91 74000 68615',
        whatsapp: '+91 74000 68615'
      },
      thane: {
        name: 'Thane Branch', 
        address: 'Anand Nagar, Thane, Mumbai',
        phone: '+91 99670 02481',
        whatsapp: '+91 99670 02481'
      }
    };
    return branches[branch] || branches.powai;
  };

  const branchInfo = getBranchInfo(formData?.branch);

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
        {/* Appointment Details */}
        <div className="p-6 border-b border-border">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Appointment Details
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{formatDate(formData?.selectedDate)}</p>
                <p className="text-sm text-muted-foreground">Date</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{formData?.selectedTime}</p>
                <p className="text-sm text-muted-foreground">Time</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{branchInfo.name}</p>
                <p className="text-sm text-muted-foreground">{branchInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="p-6 border-b border-border">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Your Information
          </h3>
          
          <div className="space-y-2">
            <p className="text-foreground font-medium">{formData?.fullName}</p>
            <p className="text-sm text-muted-foreground">{formData?.email}</p>
            <p className="text-sm text-muted-foreground">{formData?.mobileNumber}</p>
          </div>
        </div>

        {/* Confirmation Method */}
        <div className="p-6 border-b border-border">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Confirmation Method
          </h3>
          
          <div className="flex items-center space-x-3">
            <Icon 
              name={formData?.confirmationMethod === 'whatsapp' ? "MessageCircle" : 
                    formData?.confirmationMethod === 'email' ? "Mail" : "Phone"} 
              size={20} 
              className={formData?.confirmationMethod === 'whatsapp' ? "text-green-500" : 
                        formData?.confirmationMethod === 'email' ? "text-blue-500" : "text-blue-500"} 
            />
            <div>
              <p className="font-medium text-foreground">
                {formData?.confirmationMethod === 'whatsapp' ? 'WhatsApp' : 
                 formData?.confirmationMethod === 'email' ? 'Email' : 'Phone Call'}
              </p>
              <p className="text-sm text-muted-foreground">
                {formData?.confirmationMethod === 'whatsapp' ? 
                  `You will receive a WhatsApp message at ${formData?.mobileNumber}` :
                 formData?.confirmationMethod === 'email' ? 
                  `You will receive an email at ${formData?.email}` :
                  `We will call you at ${formData?.mobileNumber}`}
              </p>
            </div>
          </div>
        </div>

        {/* Branch Contact Information */}
        <div className="p-6 bg-muted/30">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Branch Contact Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{branchInfo.phone}</p>
                <p className="text-sm text-muted-foreground">Call us for any queries</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="MessageCircle" size={16} className="text-green-500" />
              <div>
                <p className="font-medium text-foreground">{branchInfo.whatsapp}</p>
                <p className="text-sm text-muted-foreground">WhatsApp us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Important Notice
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Our team will contact you within 30 minutes to confirm your appointment. 
              Please keep your phone nearby and check your email for confirmation details.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onEdit()}
          className="flex-1"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Go Back
        </Button>
        
        <Button
          variant="default"
          size="lg"
          onClick={onConfirm}
          loading={isLoading}
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Icon name="Check" size={16} className="mr-2" />
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
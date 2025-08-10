import React from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyContact = () => {
  const emergencyInfo = [
    {
      title: 'After-Hours Emergencies',
      description: 'For urgent hair emergencies or last-minute event styling',
      contact: '+91 99670 02481',
      availability: 'Available 24/7 for existing clients',
      icon: 'AlertCircle',
      color: 'text-error'
    },
    {
      title: 'Same-Day Appointments',
      description: 'Last-minute cancellations and urgent bookings',
      contact: '+91 74000 68615',
      availability: 'Mon-Fri: 9:00 AM - 6:00 PM',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      title: 'Bridal Emergency Line',
      description: 'Wedding day hair emergencies and touch-ups',
      contact: '+91 99670 02481',
      availability: 'Available on wedding days',
      icon: 'Heart',
      color: 'text-accent'
    }
  ];

  const policies = [
    {
      title: 'Cancellation Policy',
      content: `We require 24-hour notice for cancellations to avoid charges.\nSame-day cancellations incur a 50% service fee.\nNo-shows are charged the full service amount.`,
      icon: 'Calendar'
    },
    {
      title: 'Late Arrival Policy',
      content: `Please arrive 10 minutes early for your appointment.\nArrivals more than 15 minutes late may need to reschedule.\nWe'll do our best to accommodate but cannot guarantee full service time.`,
      icon: 'Clock'
    },
    {
      title: 'Payment & Gratuity',
      content: `We accept cash, credit cards, and digital payments.\nGratuity is appreciated but not required.\n18-20% gratuity is customary for exceptional service.`,
      icon: 'CreditCard'
    }
  ];

  const handleEmergencyCall = (phone) => {
    window.location.href = `tel:${phone?.replace(/\D/g, '')}`;
  };

  return (
    <div className="space-y-8">
      {/* Emergency Contacts */}
      <div className="bg-card rounded-lg shadow-luxury border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
            <Icon name="Phone" size={20} className="text-error" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Emergency & Urgent Contact
            </h2>
            <p className="text-muted-foreground">
              We're here when you need us most
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {emergencyInfo?.map((info, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg hover:border-accent/50 hover:shadow-luxury-hover transition-luxury"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon name={info?.icon} size={20} className={info?.color} />
                <h3 className="font-medium text-foreground">{info?.title}</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3">
                {info?.description}
              </p>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleEmergencyCall(info?.contact)}
                  className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-luxury"
                >
                  <Icon name="Phone" size={16} />
                  <span className="font-medium text-sm">{info?.contact}</span>
                </button>
                
                <p className="text-muted-foreground text-xs flex items-center space-x-2">
                  <Icon name="Clock" size={12} />
                  <span>{info?.availability}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Important Notice</h4>
              <p className="text-muted-foreground text-sm">
                Emergency services are available for existing clients and may incur additional charges. 
                For new clients, please book through our regular appointment system when possible.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Policies & Information */}
      <div className="bg-card rounded-lg shadow-luxury border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Salon Policies
            </h2>
            <p className="text-muted-foreground">
              Important information for all clients
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {policies?.map((policy, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name={policy?.icon} size={16} className="text-accent" />
                </div>
                <h3 className="font-medium text-foreground">{policy?.title}</h3>
              </div>
              
              <div className="pl-11">
                <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                  {policy?.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Health & Safety</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All tools are sanitized between clients</li>
                <li>• We follow strict hygiene protocols</li>
                <li>• Allergy testing available upon request</li>
                <li>• Clean towels and capes for every service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-accent" />
                <span>Client Satisfaction</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 100% satisfaction guarantee</li>
                <li>• Complimentary touch-ups within 7 days</li>
                <li>• Professional consultation included</li>
                <li>• Aftercare instructions provided</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
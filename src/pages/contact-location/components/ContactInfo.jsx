import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'MapPin',
      title: 'Visit Our Salons',
      content: 'Thane: Shop no. 11&12, Saraswati school, Anand Nagar, Thane West\nPowai: SN 161&162 floor 1st, galleriya, Hiranandani Gardens, Powai',
      action: 'Get Directions'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      content: 'Thane: +91 99670 02481\nPowai: +91 74000 68615',
      action: 'Call Now'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      content: 'thane@lacoiffure.com\npowai@lacoiffure.com',
      action: 'Send Email'
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      content: 'Mon-Sat: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM',
      action: 'Book Now'
    }
  ];

  const handleAction = (title, action) => {
    switch (title) {
      case 'Visit Our Salons':
        // Open Thane location by default
        const thaneAddress = 'Shop no. 11&12, Saraswati school, Anand Nagar, Thane West, Thane, Maharashtra 400615';
        const encodedAddress = encodeURIComponent(thaneAddress);
        window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
        break;
      case 'Call Us':
        // Call Thane location by default
        window.location.href = 'tel:+919967002481';
        break;
      case 'Email Us':
        window.location.href = 'mailto:thane@lacoiffure.com';
        break;
      case 'Business Hours':
        window.location.href = '/appointment-booking';
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactDetails?.map((detail, index) => (
        <div
          key={index}
          className="bg-card rounded-lg p-6 shadow-luxury hover:shadow-luxury-hover transition-luxury border border-border"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
            <Icon name={detail?.icon} size={24} className="text-accent" />
          </div>
          
          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
            {detail?.title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 whitespace-pre-line">
            {detail?.content}
          </p>
          
          <button
            onClick={() => handleAction(detail?.title, detail?.action)}
            className="text-accent hover:text-accent/80 text-sm font-medium transition-luxury flex items-center space-x-2"
          >
            <span>{detail?.action}</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
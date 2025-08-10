import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const salonLocations = [
    {
      name: 'La Coiffure Salon, Thane',
      address: 'Shop no. 11&12, Saraswati school, Anand Nagar, Thane West, Thane, Maharashtra 400615',
      phone: '+91 99670 02481',
      email: 'thane@lacoiffure.com',
      hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM'
    },
    {
      name: 'La Coiffure Salon, Powai',
      address: 'SN 161&162 floor 1st, galleriya, La Coiffure Salon - Best Salon in Powai Hiranandani, Galleria, Hiranandani Gardens, Panchkutir Ganesh Nagar, Powai, Mumbai, Maharashtra 400076',
      phone: '+91 74000 68615',
      email: 'powai@lacoiffure.com',
      hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM'
    }
  ];

  const quickLinks = [
    { label: 'Home', path: '/homepage' },
    { label: 'Services', path: '/services-catalog' },
    { label: 'Our Team', path: '/stylist-profiles' },
    { label: 'Gallery', path: '/gallery-portfolio' },
    { label: 'Book Appointment', path: '/appointment-booking' },
    { label: 'Contact', path: '/contact-location' }
  ];

  const services = [
    'Hair Color & Highlights',
    'Precision Cuts & Styling',
    'Special Occasion Hair',
    'Bridal Services',
    'Hair Treatments',
    'Men\'s Grooming'
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/lacoiffuresalon' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/lacoiffuresalon' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/lacoiffuresalon' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/lacoiffuresalon' }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`, '_self');
  };

  const handleLocationClick = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Scissors" size={20} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">La Coiffure</h3>
                <p className="text-background/70 text-sm">Luxury Salon</p>
              </div>
            </div>
            <p className="text-background/80 mb-4 max-w-md">
              Creating beautiful transformations with artistry, expertise, and luxury service since 2010. 
              Experience the pinnacle of hair and beauty services at our exclusive salons.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.url)}
                  className="w-10 h-10 bg-background/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-luxury"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon name={social.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className={`text-background/80 hover:text-accent transition-luxury ${
                      location.pathname === link.path ? 'text-accent' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-sm text-background/80">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-2 text-sm text-background/80">
              <p className="font-medium text-background">Main Office</p>
              <p>La Coiffure Salon</p>
              <p>Thane & Powai Locations</p>
              <div className="pt-2">
                <p className="font-medium text-background">General Inquiries</p>
                <p>info@lacoiffure.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Salon Locations */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <h4 className="font-semibold mb-6 text-lg text-center">Our Locations</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {salonLocations.map((location, index) => (
              <div key={index} className="bg-background/5 rounded-lg p-6 border border-background/10">
                <h5 className="font-semibold text-lg mb-3 text-accent">{location.name}</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icon name="MapPin" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <button
                      onClick={() => handleLocationClick(location.address)}
                      className="text-background/80 hover:text-accent transition-luxury text-left"
                    >
                      {location.address}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-accent" />
                    <button
                      onClick={() => handlePhoneClick(location.phone)}
                      className="text-background/80 hover:text-accent transition-luxury"
                    >
                      {location.phone}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-accent" />
                    <button
                      onClick={() => handleEmailClick(location.email)}
                      className="text-background/80 hover:text-accent transition-luxury"
                    >
                      {location.email}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-accent" />
                    <span className="text-background/80">{location.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="text-center max-w-md mx-auto">
            <h4 className="font-semibold mb-2 text-lg">Stay Updated</h4>
            <p className="text-background/80 mb-4 text-sm">
              Subscribe to our newsletter for exclusive offers, styling tips, and salon updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-luxury font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-background/60">
              © {currentYear} La Coiffure Salon. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-background/60 hover:text-accent transition-luxury">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-background/60 hover:text-accent transition-luxury">
                Terms of Service
              </Link>
              <Link to="/cancellation-policy" className="text-background/60 hover:text-accent transition-luxury">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

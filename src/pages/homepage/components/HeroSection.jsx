import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28">
      {/* Background (gradient only, removed broken image) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40 z-10" />
      </div>

      {/* Video Background Option */}
      {isVideoPlaying && (
        <div className="absolute inset-0 z-20">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            onEnded={() => setIsVideoPlaying(false)}
          >
            <source src="/videos/salon-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/20" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto pt-8 sm:pt-12 lg:pt-16">


          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
            Where Luxury Meets
            <span className="text-accent block">Artistry</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of hair and beauty services in our exclusive salon. 
            Our master stylists create stunning transformations that reflect your unique style.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/appointment-booking">
              <Button size="lg" className="text-lg px-8 py-4">
                <Icon name="Calendar" size={20} className="mr-2" />
                Book Your Appointment
              </Button>
            </Link>
            
            <button
              onClick={handlePlayVideo}
              className="flex items-center space-x-2 text-foreground hover:text-accent transition-luxury"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Play" size={20} className="text-accent" />
              </div>
              <span className="text-lg font-medium">Watch Our Story</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Licensed Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span>Flexible Hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-warning" />
              <span>Premium Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-luxury">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Scissors" size={20} color="white" />
            </div>
            <div>
              <p className="font-medium text-foreground">Expert Stylists</p>
              <p className="text-xs text-muted-foreground">15+ years experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-40 right-10 hidden lg:block">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-luxury">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
              <Icon name="Award" size={20} color="white" />
            </div>
            <div>
             
              <p className="text-xs text-muted-foreground">Best Salon </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
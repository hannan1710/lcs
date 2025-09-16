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
            <source src="/lcss.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/20" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 lg:px-8 text-center">
        {/*
          The top padding on this div is what's creating the large gap.
          It has been reduced from `pt-8 sm:pt-12 lg:pt-16`
          to a smaller, more balanced `pt-4 sm:pt-6 lg:pt-8`
        */}
        <div className="max-w-4xl mx-auto pt-4 sm:pt-6 lg:pt-8">


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
              <div className="text-2xl font-bold text-accent mb-1">1000+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">4.7★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/appointment-booking">
              <Button size="lg" className="text-lg px-8 py-4">
                <Icon name="Calendar" size={20} className="mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span> Professionals</span>
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
    </section>
  );
};

export default HeroSection;